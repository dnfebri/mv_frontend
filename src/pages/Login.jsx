import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputModel1 from "../components/input/InputModel1";
import { useNavigate } from "react-router-dom";
import { useStoreApp } from "../app/Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../app/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isSuccess,
    message,
    setIsLoading,
    setProses,
    isError,
    setIsError,
    setMessage,
  } = useStoreApp();
  const [inputs, setInputs] = useState({});
  const { auth, getAuthMe } = useAuth();
  const storedDarkMode = localStorage.getItem("dark-mode");
  const [isDarkMode, setIsDarkMode] = useState(
    storedDarkMode === null ? false : storedDarkMode === "true"
  );

  const getAuth = async () => {
    try {
      const getMe = await axios.get(`${process.env.API_URL_APP}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error.response);
      localStorage.removeItem("access_token");
    }
  };

  const toastId = React.useRef(null);
  useEffect(() => {
    localStorage.setItem("dark-mode", isDarkMode);
    const html = window.document.documentElement;
    if (auth) {
      navigate("/");
    }
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    if (isSuccess) {
      toastId.current = toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setProses(false, "");
    }
    if (isError) {
      toastId.current = toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsError(false);
      setMessage("");
    }
    // if (localStorage.getItem("access_token")) {
    //   getAuth();
    // }
  }, [auth, isDarkMode, isSuccess, isError, message]);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };
  const hendelLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    // setProses(true, "data.message");
    // navigate("/dashboard");
    try {
      const response = await axios.post(
        `${process.env.API_URL_APP}/auth/login`,
        inputs
      );
      const data = await response.data;
      setProses(await data.success, await data.message);
      localStorage.setItem("access_token", data.data.token);
      setIsLoading(false);
      getAuthMe();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 dark:bg-neutral-800">
      <div className="bg-white dark:bg-black dark:text-slate-300 p-4 rounded-lg w-80">
        <ToastContainer />
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="invert dark:invert-0 w-20 mx-auto"
        />
        {isError && (
          <div className="text-center text-red-500 mt-4">
            <p>{message}</p>
          </div>
        )}
        <h1 className="font-black text-2xl my-2 text-center">LOGIN</h1>
        <form onSubmit={hendelLogin}>
          {/* {isError && <p className="text-center mt-2">{massage}</p>} */}
          <div className="mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
            <InputModel1
              label="username"
              type="text"
              name="username"
              id="username"
              value={inputs.username || ""}
              onChange={handleChange}
            />
            <InputModel1
              label="Password"
              type="password"
              name="password"
              id="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <div className="mt-4 py-2">
              <button
                type="submit"
                className={`
                  py-1 w-full text-center text-black font-bold rounded-lg 
                  ${
                    isLoading ? "bg-green-700" : "bg-green-600"
                  } hover:bg-green-500
                  transition-all duration-300
                `}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
            <div className="py-2">
              <Link to={"/register"}>
                <p className="underline text-blue-500 hover:text-blue-400 transition-all duration-300">
                  Register
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
