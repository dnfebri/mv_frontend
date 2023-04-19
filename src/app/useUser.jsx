import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand'

const authMe = create((set) => ({
  auth: true,
  user: {},
  role: 0,
  isLoading: false,
  isSuccess: false,
  message: ''
}));

export const useUser = () => {
  const auth = authMe((e) => e.auth);
  const authUser = authMe((e) => e.user);
  const userRole = authMe((e) => e.role);
  const isLoading = authMe((e) => e.isLoading);
  const isSuccess = authMe((e) => e.isSuccess);
  const message = authMe((e) => e.message);
  useEffect(() => {
    getAuthMe()
  }, []);

  const getAuthMe = async () => {
    try {
      const res = await axios.get(APP_URL_API + 'auth/me', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const data = await res.data.user;
      authMe.setState({
        auth: true,
        user: data,
        role: await res.data.roleId
      });
    } catch (error) {
      console.log("error useUser", error);
      authMe.setState({
        auth: false
      });
    }
  }

  const setAlert = (isSuccess, message) => {
    authMe.setState({
      isSuccess: isSuccess,
      message: message
    });
  }

  return {getAuthMe, auth, userRole, authUser, isLoading, isSuccess, message, setAlert};
}