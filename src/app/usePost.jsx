import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";
import zukeeper from "zukeeper";

const postStore = create(
  zukeeper(set => ({
    postId: 0,
    isShowModal: false,
    isNameModal: "",
  }))
);

window.store = postStore;

export const usePost = () => {
  const postId = postStore(e => e.postId);
  const isShowModal = postStore(e => e.isShowModal);
  const isNameModal = postStore(e => e.isNameModal);

  const setPostId = id => {
    postStore.setState({
      postId: id,
    });
  };

  const setIsNameModal = name => {
    postStore.setState({
      isNameModal: name,
    });
  };
  const setIsShowModal = set => {
    postStore.setState({
      isShowModal: set,
    });
  };

  return {
    postId,
    setPostId,
    isShowModal,
    setIsShowModal,
    isNameModal,
    setIsNameModal,
  };
};
