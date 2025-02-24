import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

const Editor = ({ initialContent = "", id, cookies }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [content, setContent] = useState(initialContent);

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
        setContent(quill.root.innerHTML);
      });

      quillInstance.current = quill; // Store reference to prevent reinitialization
    }
  }, [initialContent]);

  async function handleSave() {
    try {
      if (id) {
        const res = await axios.post(
          `http://localhost:3000/draft/${id}`,
          { body: content },
          { headers: { "x-auth-token": cookies.token } }
        );
        console.log("Saved draft:", res.data);
      } else {
        const res = await axios.post(
          `http://localhost:3000/draft/`,
          { body: content },
          { headers: { "x-auth-token": cookies.token } }
        );
        console.log("Saved draft:", res.data);
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  }

  async function handleDelete(){

  }

  return (
    <div>
      <div ref={editorRef} style={{ height: "300px" }}></div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Editor;
