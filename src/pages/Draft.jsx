import { useEffect, useState } from "react"
import LogoutBtn from "../components/LogoutBtn"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/auth/auth_context";
import axios from "axios";
import Editor from "../components/Editor";

export default function Draft(){
    const {id}= useParams();
    const { cookies } = useAuth();
    const [draft, setDraft] = useState();


    useEffect(()=>{
        async function getDraft(id) {
            const res= await axios.get(`http://localhost:3000/draft/${id}`, {
                headers: {
                  "x-auth-token": cookies.token,
                },
              });
              const draft = await res.data; 
              setDraft(draft);

        }
        getDraft(id);

    },[])

    function loaded(){
        return(
            <>
            <LogoutBtn/>
            <Editor initialContent={draft.body} id={id} cookies={cookies}/>
            </>
        )
    }

    function loading(){
        return <><h3>Loading</h3></>
    }
    

    return draft? loaded():loading();
}