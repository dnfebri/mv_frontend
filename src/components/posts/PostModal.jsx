import React, { useState } from "react";
import { useStoreApp } from "../../app/Store";
import axios from "axios";

const PostModal = ({ title }) => {
  const {
    isLoading,
    isSuccess,
    message,
    setIsLoading,
    setProses,
    isError,
    setIsError,
    setMessage,
    isShowModal,
    setIsShowModal,
  } = useStoreApp();
  const [inputs, setInputs] = useState({});
  const [previewImg, setPreviewImg] = useState();
  const [image, setImage] = useState({});

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };
  const onSelectImage = e => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  const handelSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("caption", inputs.caption);
    formData.append("tags", inputs.tags);
    formData.append("image", image);
    try {
      const response = await axios.post(
        `${process.env.API_URL_APP}/post`,
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
      setIsShowModal(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.message);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-full max-w-2xl bg-white dark:bg-slate-900 dark:text-slate-300">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setIsShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <form onSubmit={handelSubmit}>
              <div className="relative p-6 flex-auto">
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
                  <div className="my-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Caption
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="caption"
                      onChange={handleChange}
                      value={inputs.caption || ""}
                      placeholder="Caption"
                      required={true}
                    />
                  </div>
                  <div className="my-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {"Tags (#senja #surabaya)"}
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="tags"
                      onChange={handleChange}
                      value={inputs.tags || ""}
                      placeholder="tags"
                      required={true}
                    />
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setIsShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PostModal;
