import React,{ useState } from "react";
import SignupForm from '../components/SignupForm'


export default function Login() {
  const[newUser, setNewUser]=useState(false);
  
  return (
    <>
      <SignupForm setNewUser={setNewUser} />
    </>
  );
}