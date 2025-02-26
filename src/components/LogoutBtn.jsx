import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";
import ImageModal from "./ImageModal";

export default function LogoutBtn() {
  const nav = useNavigate();
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleDash() {
    nav("/dashboard");
  }

  async function handleLogout() {
    await logout();
    nav("/");
  }
  function handleInsp(){
setIsModalOpen(true);
  }
  return (
    <>
      <button className="dashboardBtn" onClick={handleDash}>
        Dashboard
      </button>
      <button onClick={handleInsp}>Click here to get inspiration</button>
      <ImageModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />
      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
