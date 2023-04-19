import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputModel1 from "../components/input/InputModel1";
import { useStoreApp } from "../app/Store";
import axios from "axios";
import { useAuth } from "../app/useAuth";

const User = () => {
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
  const { getAuthMe } = useAuth();
  const [inputs, setInputs] = useState({});
  const [isImageExists, setIsImageExists] = useState(false);
  const [previewImg, setPreviewImg] = useState();
  const [photo, setPhoto] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };
  const onSelectImage = e => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setPhoto(e.target.files[0]);
      setInputs(values => ({ ...values, files: e.target.files[0] }));
    }
  };
  const getUserId = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL_APP}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.data.data;
      setInputs(data);
      imageExists(data.photo);
    } catch (error) {
      console.log(error);
    }
  };
  const imageExists = async url => {
    try {
      const result = await axios.get(url);
      setIsImageExists(true);
    } catch (error) {
      setIsImageExists(false);
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
    getUserId();
  }, [isSuccess, isError, message]);

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("username", inputs.username);
    formData.append("email", inputs.email);
    formData.append("photo", photo);

    try {
      const response = await axios.put(
        `${process.env.API_URL_APP}/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.data;
      setProses(data.success, data.message);
      setIsLoading(false);
      getAuthMe();
      setPhoto({});
      setIsDisable(true);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.message);
    }
  };

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
                label="Name"
                type="text"
                name="name"
                id="name"
                value={inputs.name || ""}
                onChange={handleChange}
                required={true}
                disabled={isDisable}
                className={isDisable && "cursor-not-allowed"}
              />
              <InputModel1
                label="Username"
                type="text"
                name="username"
                id="username"
                value={inputs.username || ""}
                onChange={handleChange}
                required={true}
                disabled={isDisable}
                className={isDisable && "cursor-not-allowed"}
              />
              <InputModel1
                label="Email"
                type="email"
                name="email"
                id="email"
                value={inputs.email || ""}
                onChange={handleChange}
                required={true}
                disabled={isDisable}
                className={isDisable && "cursor-not-allowed"}
              />
              <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload images
                </label>
                <input
                  className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                    isDisable && "cursor-not-allowed"
                  }`}
                  disabled={isDisable}
                  onChange={onSelectImage}
                  id="file_input"
                  name="image"
                  type="file"
                />
                <div className="h-32 w-32 mt-6 mx-4">
                  <img
                    className="object-cover object-center h-full w-full"
                    src={
                      previewImg
                        ? previewImg
                        : isImageExists
                        ? inputs.photo
                        : process.env.API_URL_APP + inputs.photo
                      // : "/images/noImage.jpg"
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <button
                  type="button"
                  onClick={() => setIsDisable(!isDisable)}
                  className={`
                    py-1 w-full text-center text-black font-bold rounded-lg 
                    ${
                      isLoading
                        ? "bg-green-700"
                        : isDisable
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }
                    transition-all duration-300
                  `}
                >
                  {isDisable ? "Edit" : "Cencel"}
                </button>
                <button
                  type="submit"
                  disabled={isDisable}
                  className={`
                    py-1 w-full text-center text-black font-bold rounded-lg 
                    ${
                      isLoading
                        ? "bg-green-700"
                        : isDisable
                        ? "bg-slate-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-500"
                    } 
                    transition-all duration-300
                  `}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default User;
