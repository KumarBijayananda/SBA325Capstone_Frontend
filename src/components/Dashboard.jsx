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

  async function handleNew() {
    nav("/draft");
  }
//   console.log("user data: ", user.drafts[0].title);

  function loading() {
    return <h3>Loading Data...</h3>;
  }

  function loaded() {
    return (
      <>
      <button className="createNew" onClick={handleNew}>Create New Draft</button>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <div className="cardContainer">
          {user.drafts.map((draft) => (
            <div className="">
            <DraftCard key={draft.id} draft={draft}/>
            <div className="cardInfo">
            <p>Last Update: {new Date(draft.updatedAt).toDateString()}</p>
            <button>Delete</button>
            </div>
            </div>

          ))}
        </div>
      </>
    );
  }

  return user.name ? loaded() : loading();
}
