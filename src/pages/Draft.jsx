import { useEffect, useState } from "react";
import NavBtn from "../components/NavBtn";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";
import axios from "axios";
import Editor from "../components/Editor";

export default function Draft() {
  const { id } = useParams();
  const { cookies } = useAuth();
  const [draft, setDraft] = useState();

  useEffect(() => {
    if (id) {
      async function getDraft(id) {
        const res = await axios.get(
          `https://draftrove.onrender.com/draft/${id}`,
          {
            headers: {
              "x-auth-token": cookies.token,
            },
          }
        );
        const draft = await res.data;
        setDraft(draft);
      }
      getDraft(id);
    }
  }, [id]);

  function loaded() {
    return (
      <>
        <NavBtn />
        <Editor
          initialContent={draft.body}
          id={id}
          cookies={cookies}
          setDraft={setDraft}
        />
      </>
    );
  }

  function loading() {
    if (!id) {
      return (
        <>
          <NavBtn />
          <Editor cookies={cookies} />
        </>
      );
    } else
      return (
        <>
          <h3>Loading</h3>
        </>
      );
  }

  return draft ? loaded() : loading();
}
