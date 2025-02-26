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
  return (
    <>
      <button className="dashboardBtn" onClick={handleDash}>
        Dashboard
      </button>
      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
