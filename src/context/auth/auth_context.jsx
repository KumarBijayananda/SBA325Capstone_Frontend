import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [draft, setDraft] = useState(null);

  //Login function
  async function login(formData) {
    try {
      let res = await axios.post(
        "https://draftrove.onrender.com/login",
        formData
      );
      //take token from res amd set to cookies
      setCookies("token", res.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  //Signup function
  async function signUp(formData) {
    try {
      let res = await axios.post(
        "https://draftrove.onrender.com/signup",
        formData
      );
      //take token from res and set to cookies
      setCookies("token", res.data.token);
    } catch (error) {
      console.log(error);
    }
  }
  //Logout function
  function logout() {
    ["token"].forEach((obj) => removeCookie(obj));
  }

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      signUp,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
