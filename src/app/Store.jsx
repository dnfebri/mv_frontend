import { create } from 'zustand'

const store = create((set) => ({
  isSuccess: false,
  isLoading: false,
  message: ''
}));

export const useStoreApp = () => {
  const isSuccess = store((e) => e.isSuccess);
  const isLoading = store((e) => e.isLoading);
  const message = store((e) => e.message);

  const setProses = (isSuccess, message) => {
    store.setState({
      isSuccess: isSuccess,
      message: message
    })
  }

  const setIsLoading = (isLoading) => {
    store.setState({
      isLoading: isLoading
    })
  }

  return {isSuccess, isLoading, message, setProses, setIsLoading}
}

export const useSidebarOpen = create((set) => ({
  open: false,
  setSidebarOpen: () => set((state) => ({open: !state.open}))
}))
