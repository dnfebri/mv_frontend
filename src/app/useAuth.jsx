import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";

const stateAuth = {
  auth: false,
  idUser: 0,
  name: "",
  username: "",
  email: "",
  photo: "",
  authMesaage: "",
};

const authMe = create(set => stateAuth);

export const useAuth = () => {
  const auth = authMe(e => e.auth);
  const idUser = authMe(e => e.idUser);
  const name = authMe(e => e.name);
  const username = authMe(e => e.username);
  const email = authMe(e => e.email);
  const photo = authMe(e => e.photo);
  const authMesaage = authMe(e => e.authMesaage);
  useEffect(() => {
    if (!auth) {
      getAuthMe();
    }
  }, [auth]);

  const getAuthMe = async () => {
    if (auth) return;
    try {
      const res = await axios.get(`${process.env.API_URL_APP}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.data;
      authMe.setState({
        auth: data.success,
        idUser: data.data.id,
        name: data.data.name,
        username: data.data.username,
        email: data.data.email,
        photo: data.data.photo,
        authMesaage: "",
      });
    } catch (error) {
      authMe.setState({
        auth: false,
        authMesaage: error.response.message,
      });
    }
  };

  const resetAuth = () => {
    authMe.setState(stateAuth);
  };

  return {
    getAuthMe,
    auth,
    idUser,
    name,
    username,
    email,
    photo,
    authMesaage,
    resetAuth,
  };
};
