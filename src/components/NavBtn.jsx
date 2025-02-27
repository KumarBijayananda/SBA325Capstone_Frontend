//NavBtn component to hold nav buttons


//Dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";
import ImageModal from "./ImageModal";

export default function NavBtn() {
  const nav = useNavigate();
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //function to navigate to dashboard
  function handleDash() {
    nav("/dashboard");
  }

  //function to handle logout
  async function handleLogout() {
    await logout();
    nav("/");
  }
  //call the setter function to open the modal to display images
  function handleInsp() {
    setIsModalOpen(true);
  }
  return (
    <>
      <button className="dashboardBtn" onClick={handleDash}>
        Dashboard
      </button>
      <button onClick={handleInsp}>Click here to get inspiration</button>
      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
