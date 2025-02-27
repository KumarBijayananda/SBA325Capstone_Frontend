// /url
import { useNavigate } from "react-router-dom";

export default function Home(){
    const nav=useNavigate(); //initialized useNavigate into variable


    return(
        <>
        <button onClick={()=>nav('/login')}>Login</button>
        <button onClick={()=>nav('/signup')}>Sign up</button>
        <h1>Welcome to Draftrove</h1>
        <h3>Login or Sign up if you don't already have an account.</h3>
        <p>You can create unlimited drafts for your ideas and archive any version for later as you work on your current version. Each 
        archive and current version is saved as a seperate document.
        </p>
        </>
    )
}