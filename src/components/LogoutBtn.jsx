import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";

export default function LogoutBtn(){
    const nav=useNavigate();
    const {logout} = useAuth();

    async function handleLogout(){
        await logout();
        nav('/')
    }
    return(
        <>
        <button className="logout" onClick={handleLogout}>
            Logout
        </button>
        </>
    )
}