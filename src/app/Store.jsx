import { create } from "zustand";

const store = create(set => ({
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}));

export const useStoreApp = () => {
  const isError = store(e => e.isError);
  const isSuccess = store(e => e.isSuccess);
  const isLoading = store(e => e.isLoading);
  const message = store(e => e.message);

  const setProses = (isSuccess, message) => {
    store.setState({
      isSuccess: isSuccess,
      message: message,
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

  return {
    isError,
    isSuccess,
    isLoading,
    message,
    setProses,
    setIsLoading,
    setIsError,
  };
};

export const useSidebarOpen = create(set => ({
  open: false,
  setSidebarOpen: () => set(state => ({ open: !state.open })),
}));
