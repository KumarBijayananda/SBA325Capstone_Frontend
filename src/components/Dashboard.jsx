import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth/auth_context";
import DraftCard from "./DraftCard";

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
//   console.log("user data: ", user.drafts[0].title);

  function loading() {
    return <h3>Loading Data...</h3>;
  }

  function loaded() {
    return (
      <>
        <h1>Test</h1>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <div className="cardDiv">
          {user.drafts.map((draft) => (
            <DraftCard key={draft.id} draft={draft}/>
          ))}
        </div>
      </>
    );
  }

  return user.name ? loaded() : loading();
}
