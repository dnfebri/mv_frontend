import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputModel1 from "../components/input/InputModel1";
import { useNavigate } from "react-router-dom";
import { useStoreApp } from "../app/Store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, setProses } = useStoreApp();
  const [inputs, setInputs] = useState({});
  const [registerFalse, setRegisterFalse] = useState(false);
  const [message, setMessage] = useState("");
  const [previewImg, setPreviewImg] = useState();
  const [photo, setPhoto] = useState({});

  const storedDarkMode = localStorage.getItem("dark-mode");
  const [isDarkMode, setIsDarkMode] = useState(
    storedDarkMode === null ? false : storedDarkMode === "true"
  );

  useEffect(() => {
    localStorage.setItem("dark-mode", isDarkMode);
    const html = window.document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };
  const hendelRegister = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("username", inputs.username);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("confPassword", inputs.confPassword);
    formData.append("photo", photo);

    setProses(true, "data.message");
    navigate("/login");
    // try {
    //   const response = await axios.post(
    //     `${process.env.API_URL_APP}/auth/register`,
    //     formData
    //   );
    //   const data = await response.data;
    //   setProses(data.success, data.message);
    //   setIsLoading(false);
    //   navigate("/login");
    // } catch (error) {
    //   console.log(error);
    //   setMessage(error.response.data.message);
    //   setRegisterFalse(true);
    //   setIsLoading(false);
    // }
  };

  const onSelectImage = e => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setPhoto(e.target.files[0]);
      setInputs(values => ({ ...values, files: e.target.files[0] }));
    }
  };

  const toastId = React.useRef(null);
  useEffect(() => {
    if (registerFalse) {
      toastId.current = toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setRegisterFalse(false);
    }
  }, [registerFalse]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 dark:bg-neutral-800">
      <div className="bg-white dark:bg-black dark:text-slate-300 p-4 rounded-lg w-full max-w-lg">
        <ToastContainer />
        {/* <img src="/images/logo.svg" alt="Logo" className="invert dark:invert-0 w-20 mx-auto" /> */}
        <h1 className="font-black text-2xl my-2 text-center">REGISTER USER</h1>
        {message && (
          <div className="text-center text-red-500 mt-4">
            <p>{message}</p>
          </div>
        )}
        <form onSubmit={hendelRegister}>
          {/* {isError && <p className="text-center mt-2">{massage}</p>} */}
          <div className="mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
            <InputModel1
              label="Name"
              type="text"
              name="name"
              id="name"
              value={inputs.name || ""}
              onChange={handleChange}
              required={true}
            />
            <InputModel1
              label="Username"
              type="text"
              name="username"
              id="username"
              value={inputs.username || ""}
              onChange={handleChange}
              required={true}
            />
            <InputModel1
              label="Email"
              type="email"
              name="email"
              id="email"
              value={inputs.email || ""}
              onChange={handleChange}
              required={true}
            />
            <InputModel1
              label="Password"
              type="password"
              name="password"
              id="password"
              value={inputs.password || ""}
              onChange={handleChange}
              required={true}
            />
            <InputModel1
              label="Confrim_Password"
              type="password"
              name="confPassword"
              id="confPassword"
              value={inputs.confPassword || ""}
              onChange={handleChange}
              required={true}
            />
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upload images
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={onSelectImage}
                id="file_input"
                name="image"
                type="file"
              />
              <div className="h-32 w-32 mt-6 mx-4">
                <img
                  className="object-cover object-center h-full w-full"
                  src={previewImg ?? "/images/noImage.jpg"}
                />
              </div>
            </div>

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
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
            <div className="py-2">
              <Link to={"/login"}>
                <p className="underline text-blue-500 hover:text-blue-400 transition-all duration-300">
                  Login
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
