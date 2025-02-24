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
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
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
      const res = await axios.post(
        `http://localhost:3000/draft/${id}`,
        { body: content },
        { headers: { "x-auth-token": cookies.token } }
      );
      console.log("Saved draft:", res.data);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  }

  return (
    <div>
      <div ref={editorRef} style={{ height: "300px" }}></div>
      <button onClick={handleSave} style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>
        Save
      </button>
    </div>
  );
};

export default Editor;
