//Editor component so user can create a draft and save it or archive it for later

//Dependencies
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import Versions from "./Versions";

const Editor = ({ initialContent = "", id, cookies }) => {
  const nav = useNavigate();
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [versions, setVersions] = useState([]);

  // Initialize Quill editor
  useEffect(() => {
    if (!quillInstance.current && editorRef.current) {
      //Instantializing quill editor
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      quill.clipboard.dangerouslyPasteHTML(initialContent); // setting initial content

      //event listener for text change
      quill.on("text-change", () => {
        quillInstance.current = quill;
      });

      quillInstance.current = quill; // storing reference to prevent reinitialization
    }
  }, []);

  // fetching draft versions when `id` changes
  const getVersions = async () => {
    try {
      if (id) {
        const res = await axios.get(
          `https://draftrove.onrender.com/archive/${id}`,
          {
            headers: {
              "x-auth-token": cookies.token,
            },
          }
        );
        setVersions(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVersions();
  }, [id]);

  // saving draft
  async function handleSave() {
    if (quillInstance.current.root.textContent.trim() === "") {
      window.alert("There is nothing to save!!");
    } else {
      try {
        //checking if id exists, if it does it is re-save if it doesn't it is a new save
        if (id) {
          await axios.patch(
            `https://draftrove.onrender.com/draft/${id}`,
            { body: quillInstance.current.root.innerHTML },
            { headers: { "x-auth-token": cookies.token } }
          );
        } else {
          const res = await axios.post(
            `https://draftrove.onrender.com/draft/`,
            { body: quillInstance.current.root.innerHTML },
            { headers: { "x-auth-token": cookies.token } }
          );

          if (res.data) nav(`/draft/${res.data}`);
        }
      } catch (error) {
        console.error("Error saving draft:", error);
      }
    }
  }

  // Archive current draft
  async function handleArchive() {
    await handleSave();
    try {
      if (id) {
        await axios.post(
          `https://draftrove.onrender.com/archive/${id}`,
          { body: quillInstance.current.root.innerHTML },
          { headers: { "x-auth-token": cookies.token } }
        );
        await getVersions(); // Refresh versions list after archiving
      }
    } catch (error) {
      console.error("Error archiving draft:", error);
    }
  }

  return (
    <div className="editorContainer">
      <div className="versionDiv">
        <Versions versions={versions} quillInstance={quillInstance} />
      </div>
      <div className="editorDiv">
        <div ref={editorRef} style={{ height: "60vh" }}></div>
        <button onClick={handleSave}>Save</button>
        <button disabled={!id} onClick={handleArchive}>
          Archive
        </button>
      </div>
    </div>
  );
};

export default Editor;
