import React, { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreApp } from '../../app/Store';

const AlertToast = () => {
  const { 
    setProses, 
    isSuccess, 
    message 
  } = useStoreApp();
  const toastId = React.useRef(null);
  useEffect(() => {
    if (isSuccess && toastId.current === null) {
      toastId.current = toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setProses(false, "");
    }
    // toastId.current = null;
  }, [isSuccess]);
  return (
    <>
      <ToastContainer />
    </>
  )
}

export default AlertToast