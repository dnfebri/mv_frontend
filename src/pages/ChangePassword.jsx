import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreApp } from "../app/Store";
import InputModel1 from "../components/input/InputModel1";
import axios from "axios";
import { useAuth } from "../app/useAuth";

const ChangePassword = () => {
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

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };
  const updateUser = async () => {
    // const formData = new FormData();
    // formData.append("oldPassword", inputs.oldPassword);
    // formData.append("newPassword", inputs.newPassword);
    // formData.append("confrimNewPassword", inputs.confrimNewPassword);
    try {
      const response = await axios.put(
        `${process.env.API_URL_APP}/user/change-password`,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.data;
      console.log(data.message);
      setProses(data.success, data.message);
      setIsLoading(false);
      setInputs({});
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.message);
    }
  };
  const toastId = React.useRef(null);
  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess);
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
  }, [isSuccess, isError, message]);
  const hendelUpdate = e => {
    setIsLoading(true);
    e.preventDefault();
    if (confirm("Are you sure want to update this data?")) {
      updateUser();
    }
  };
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen dark:bg-neutral-800">
        <div className="bg-neutral-100 dark:bg-neutral-900 dark:text-slate-300 p-4 rounded-lg w-full max-w-lg">
          <ToastContainer />
          {/* <img src="/images/logo.svg" alt="Logo" className="invert dark:invert-0 w-20 mx-auto" /> */}
          <h1 className="font-black text-2xl my-2 text-center">Detail User</h1>
          {isError && (
            <div className="text-center text-red-500 mt-4">
              <p>{message}</p>
            </div>
          )}
          <form onSubmit={hendelUpdate}>
            {/* {isError && <p className="text-center mt-2">{massage}</p>} */}
            <div className="mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
              <InputModel1
                label="Old_Password"
                type="password"
                name="oldPassword"
                id="oldPassword"
                value={inputs.oldPassword || ""}
                onChange={handleChange}
                required={true}
              />
              <InputModel1
                label="New_Password"
                type="password"
                name="newPassword"
                id="newPassword"
                value={inputs.newPassword || ""}
                onChange={handleChange}
                required={true}
              />
              <InputModel1
                label="Confrim_New_Password"
                type="password"
                name="confrimNewPassword"
                id="confrimNewPassword"
                value={inputs.confrimNewPassword || ""}
                onChange={handleChange}
                required={true}
              />

              <div className="flex justify-center gap-4 pt-8">
                <button
                  type="submit"
                  className={`
                    py-1 w-full max-w-xs text-center text-black font-bold rounded-lg 
                    ${
                      isLoading
                        ? "bg-green-700"
                        : "bg-green-600 hover:bg-green-500"
                    } 
                    transition-all duration-300
                  `}
                >
                  {isLoading ? "Loading..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
