//Dashboard component to display various draft for the user

//Dependencies
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
    //gets all the drafts for the user and rerenders the page using setUser function
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

  //navigate to the draft page with the editor when create new button is clicked
  async function handleNew() {
    nav("/draft");
  }

  //deletes the draft and all the associated archives for it
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
        {/* maps through the drafts and passes the info to Draftcard component as props */}
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
