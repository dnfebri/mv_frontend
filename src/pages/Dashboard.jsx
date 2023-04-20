import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useStoreApp } from "../app/Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PostsList from "../components/posts/PostsList";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, setProses, isSuccess, message } =
    useStoreApp();

  const getAuth = async () => {
    try {
      await axios.get(`${process.env.API_URL_APP}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  const toastId = React.useRef(null);
  useEffect(() => {
    if (isSuccess && toastId.current === null) {
      toastId.current = toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setProses(false, "");
    }
    getAuth();
  }, [isSuccess, message]);
  return (
    <Layout>
      <ToastContainer />
      <PostsList />
    </Layout>
  );
};

export default Dashboard;
