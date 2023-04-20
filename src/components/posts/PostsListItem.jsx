import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useStoreApp } from "../../app/Store";
import { usePost } from "../../app/usePost";
import axios from "axios";

const PostsListItem = props => {
  const { data } = props;
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
  } = useStoreApp();
  const { setPostId, setIsShowModal, setIsNameModal } = usePost();
  const { pathname } = useLocation();

  const deletePost = async id => {
    try {
      const response = await axios.delete(
        `${process.env.API_URL_APP}/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const result = await response.data;
      setProses(result.success, result.message);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      const status = await error.response.status;
      if (status === 403 || status === 401) {
        navigate("/login");
      }
    }
  };
  const handeleDelete = id => {
    if (confirm("Are you sure deleted post!")) {
      deletePost(id);
    }
  };
  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {data.map((row, idx) => (
        <div
          key={idx}
          className="w-full max-w-[18rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative"
        >
          <div className="h-52 rounded-t-lg overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={row.image}
              alt={row.caption}
            />
          </div>
          <div
            className={`px-5 mt-2 ${
              pathname.includes("post") ? "pb-12" : "pb-5"
            }`}
          >
            <div className="flex items-center gap-2 text-lg text-blue-700">
              {/* <AiFillLike /> {row.likes} */}
              <button>
                <AiOutlineLike />
              </button>
              <p>{row.likes > 0 ? row.likes : ""}</p>
            </div>
            <h5 className="text-lg tracking-tight text-blue-900 dark:text-blue-300">
              {row.user.username}
            </h5>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {row.caption}
            </h5>
            <div className="my-2">
              <p className="text-blue-500 text-xs">{row.tags}</p>
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 px-5 my-2 flex justify-end gap-2 text-white ${
                pathname.includes("post") ? "" : "hidden"
              }`}
            >
              <button
                className="px-4 py-1 rounded-full bg-slate-500 hover:bg-slate-600 transition-all duration-150"
                onClick={() => {
                  setIsShowModal(true);
                  setIsNameModal("Edit post");
                  setPostId(row.id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handeleDelete(row.id)}
                className="px-4 py-1 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsListItem;
