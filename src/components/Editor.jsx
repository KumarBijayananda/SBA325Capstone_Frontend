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

      quill.clipboard.dangerouslyPasteHTML(initialContent); // Set initial content

      quill.on("text-change", () => {
        quillInstance.current = quill;
      });

      quillInstance.current = quill; // Store reference to prevent reinitialization
    }
  }, []);

  // Fetch draft versions when `id` changes
  const getVersions = async () => {
    try {
      if (id) {
        const res = await axios.get(`http://localhost:3000/archive/${id}`, {
          headers: {
            "x-auth-token": cookies.token,
          },
        });
        setVersions(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVersions();
  }, [id]);

  // Save draft
  async function handleSave() {
    if (quillInstance.current.root.textContent.trim() === "") {
      window.alert("There is nothing to save!!");
    } else {
      try {
        if (id) {
          await axios.patch(
            `http://localhost:3000/draft/${id}`,
            { body: quillInstance.current.root.innerHTML },
            { headers: { "x-auth-token": cookies.token } }
          );
        } else {
          const res = await axios.post(
            `http://localhost:3000/draft/`,
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
          `http://localhost:3000/archive/${id}`,
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
        <button disabled={!id} onClick={handleArchive}>Archive</button>
      </div>
    </div>
  );
};

export default Editor;
