import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth/auth_context";

export default function DashboardComp() {
  const { cookies } = useAuth();

  const nav = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    drafts: [],
  });

  useEffect(() => {
    console.log("getUserData");

    async function getUserData() {
      try {
        const res = await axios.get("http://localhost:3000/dashboard", {
          headers: {
            "x-auth-token": cookies.token,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUserData();
  }, []);

  async function handleclick(e) {
    nav("/draft");
  }

  return (
    <>
      <h1>Test</h1>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
    </>
  );
}
