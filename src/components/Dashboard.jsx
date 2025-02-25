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
  }, [user]);

  async function handleNew() {
    nav("/draft");
  }

  async function handleDelete(id){
    const res = await axios.delete(`http://localhost:3000/dashboard/${id}`, {
      headers: {
        "x-auth-token": cookies.token,
      },
    });
    setUser(res.data)
  }
  function loading() {
    return <h3>Loading Data...</h3>;
  }

  function loaded() {
    return (
      <>
        <button className="createNew" onClick={handleNew}>
          Create New Draft
        </button>
        <h1>{user.name}</h1>
        {/* <h1>{user.email}</h1> */}
        <div className="cardContainer">
          {user.drafts.map((draft) => (
            <div className="cardDiv" key={draft.updatedAt}>
              <DraftCard key={draft.updatedAt} draft={draft} />
              <div className="cardInfo">
                <p>
                  Last Update on {new Date(draft.updatedAt).toDateString()}{" "}
                  {
                    new Date(draft.updatedAt)
                      .toTimeString({ hour12: false })
                      .split(" ")[0]
                  }
                </p>
                <button onClick={()=>handleDelete(draft._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return user.name ? loaded() : loading();
}
