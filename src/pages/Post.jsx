import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import PostsList from "../components/posts/PostsList";
import { BsPlusLg } from "react-icons/bs";
import PostModal from "../components/posts/PostModal";
import { useStoreApp } from "../app/Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePost } from "../app/usePost";

const Post = () => {
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
  const { postId, isShowModal, setIsShowModal, isNameModal, setIsNameModal } =
    usePost();
  const toastId = useRef(null);
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
  return (
    <Layout>
      <ToastContainer />
      <PostsList />
      <div className="fixed right-16 bottom-10 group">
        <div className="relative">
          <button
            className="h-10 w-10 flex justify-center items-center rounded-full border-2 border-black bg-green-100 group-hover:bg-green-400 transition-all duration-150"
            onClick={() => {
              setIsShowModal(true);
              setIsNameModal("Create post");
            }}
          >
            <i className="text-xl">
              <BsPlusLg />
            </i>
          </button>
          <div className="absolute top-2 bottom-0 -left-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="bg-white rounded-full px-2 bg-opacity-0 group-hover:bg-opacity-50">
              Add Post
            </p>
          </div>
        </div>
      </div>
      {isShowModal ? <PostModal title={isNameModal} postId={postId} /> : null}
    </Layout>
  );
};

export default Post;
