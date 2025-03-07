// /homepage for the site
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate(); //initialized useNavigate into variable

  return (
    <>
      <button onClick={() => nav("/login")}>Login</button>
      <button onClick={() => nav("/signup")}>Sign up</button>
      <h1>Welcome to Draftrove</h1>
      <h3>Login or Sign up if you don't already have an account.</h3>
      <p>
        You can create unlimited drafts for your ideas and archive any version
        for later as you work on your current version. Each archive and current
        version is saved as a seperate document.
      </p>
     <div className="homepageImage">
        <img
          src="/assets/Screenshot 2025-02-26 225454.png"
          alt="screenshot of pages for display"
          style={{ width: "600px", height: "350px", margin: "40px",borderRadius: "10px" }}
        />

        <img
          src="/assets/Screenshot 2025-02-26 225242.png"
          alt="screenshot of pages for display"
          style={{ width: "600px", height: "350px", margin: "40px",borderRadius: "10px" }}
        />

        <img
          src="/assets/Screenshot 2025-02-26 225407.png"
          alt="screenshot of pages for display"
          style={{ width: "600px", height: "350px", margin: "40px",borderRadius: "10px" }}
        />
        <img
          src="/assets/Screenshot 2025-02-26 225431.png"
          alt="screenshot of pages for display"
          style={{ width: "600px", height: "350px", margin: "40px",borderRadius: "10px" }}
        />
      </div>
    </>
  );
}
