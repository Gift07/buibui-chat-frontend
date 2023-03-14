import { createContext, useState } from "react";
import axiosInstance from "../axios";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  // State variables
  const [auth, setAuth] = useState({
    loading: false,
    isAuthenticated: false,
    error: null,
  });
  const [acount, setAccount] = useState(null);
  const [formdata, setFormdata] = useState({
    phone_number: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  // getting a usersId

  //   handling form data
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  //   signing in function
  const signIn = async (forndata) => {
    setAuth({ ...auth, loading: true });
    const { data } = await axiosInstance.post("/auth/sign-in", forndata);
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // setting is authenticated
    setAuth({ ...auth, loading: false, isAuthenticated: true });
    try {
    } catch (error) {
      setAuth({ ...auth, loading: false, error: error.message });
    }
  };

  //   signup fuction
  //   signing in function
  const signUp = async (forndata) => {
    setAuth({ ...auth, loading: true });
    const { data } = await axiosInstance.post("/auth/sign-up", forndata);
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // setting is authenticated
    setAuth({ ...auth, loading: false, isAuthenticated: true });
    try {
    } catch (error) {
      setAuth({ ...auth, loading: false, error: error.message });
    }
  };
  //   loading the user
  const LoadUser = () => {
    const access = localStorage.getItem("access");
    if (access) {
      setAuth({ ...auth, isAuthenticated: true });
    }
  };

  // getting the user account
  const GetAccount = async (accountId) => {
    try {
      const { data } = await axiosInstance.get(`/accounts/${accountId}`);

      setAccount(data);
    } catch (e) {
      console.log(e);
    }
  };
  // authcontext
  const authcontext = {
    auth,
    signIn,
    acount,
    GetAccount,
    signUp,
    handleChange,
    formdata,
    LoadUser,
  };
  return (
    <AuthContext.Provider value={authcontext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
