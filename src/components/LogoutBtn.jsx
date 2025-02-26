import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";

export default function LogoutBtn() {
  const nav = useNavigate();
  const { logout } = useAuth();

  function handleDash() {
    nav("/dashboard");
  }

  async function handleLogout() {
    await logout();
    nav("/");
  }
  function handleInsp(){
    
  }
  return (
    <>
      <button className="dashboardBtn" onClick={handleDash}>
        Dashboard
      </button>
      <button onClick={handleInsp}>Click here to get inspiration</button>
      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
