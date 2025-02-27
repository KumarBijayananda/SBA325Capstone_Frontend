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
        const res = await axios.get(
          "https://draftrove.onrender.com/dashboard",
          {
            headers: {
              "x-auth-token": cookies.token,
            },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUserData();
  }, [cookies.token]);

  async function handleNew() {
    nav("/draft");
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://draftrove.onrender.com/dashboard/${id}`, {
        headers: {
          "x-auth-token": cookies.token,
        },
      });

      // draft update by filtering out deleted draft
      setUser((prevUser) => ({
        ...prevUser,
        drafts: prevUser.drafts.filter((draft) => draft._id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  }
  function loading() {
    return <h3>Loading Data...</h3>;
  }

  function loaded() {
    return (
      <>
        <div className="profileBar">
          <button className="createNew" onClick={handleNew}>
            Create New Draft
          </button>
          <h1>{user.name}</h1>
        </div>

        {/* <h1>{user.email}</h1> */}
        <div className="cardContainer">
          {user.drafts.length > 0 ? (
            user.drafts.map((draft) => (
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
                  <button onClick={() => handleDelete(draft._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontStyle: "italic" }}>
              Please start creating your drafts and they will appear here...
            </p>
          )}
        </div>
      </>
    );
  }

  return user.name ? loaded() : loading();
}
