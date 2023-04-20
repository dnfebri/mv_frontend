import { create } from "zustand";

const store = create(set => ({
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isShowModal: false,
}));

export const useStoreApp = () => {
  const isError = store(e => e.isError);
  const isSuccess = store(e => e.isSuccess);
  const isLoading = store(e => e.isLoading);
  const message = store(e => e.message);
  const isShowModal = store(e => e.isShowModal);

  const setProses = (isSuccess, msg) => {
    store.setState({
      isSuccess: isSuccess,
      message: msg,
    });
  };

  const setIsLoading = isLoading => {
    store.setState({
      isLoading: isLoading,
    });
  };

  const setIsError = isError => {
    store.setState({
      isError: isError,
    });
  };
  const setMessage = message => {
    store.setState({
      message: message,
    });
  };

  const setIsShowModal = set => {
    store.setState({
      isShowModal: set,
    });
  };

  return {
    isError,
    isSuccess,
    isLoading,
    message,
    setProses,
    setIsLoading,
    setIsError,
    setMessage,
    isShowModal,
    setIsShowModal,
  };
};

export const useSidebarOpen = create(set => ({
  open: false,
  setSidebarOpen: () => set(state => ({ open: !state.open })),
}));
