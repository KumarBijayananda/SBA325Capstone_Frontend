// /login url

import React,{ useState } from "react";
import LoginForm from "../components/LoginForm";


export default function Login() {
  const[newUser, setNewUser]=useState(false);

  return (
    <>
      <LoginForm setNewUser={setNewUser} />
    </>
  );
}
