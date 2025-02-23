import { useNavigate } from "react-router-dom";

export default function Home(){
    const nav=useNavigate(); //initialized useNavigate into variable


    return(
        <>
        <button onClick={()=>nav('/login')}>Login</button>
        <button onClick={()=>nav('/signup')}>Sign up</button>
        <h1>Welcome to Draftrove</h1>
        <h3>Login or Sign up if you don't already have an account.</h3>
        <p>You can create documents for yours ideas and save it with version control where you can always
            go back to your older version. Each save will remain until you delete it manually.
        </p>
        </>
    )
}