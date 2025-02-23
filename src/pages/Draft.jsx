import { useEffect, useState } from "react"
import LogoutBtn from "../components/LogoutBtn"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/auth/auth_context";
import axios from "axios";

export default function Draft(){
    const {id}= useParams();
    const { cookies } = useAuth();
    const [draft, setDraft] = useState();


    console.log("DraftPage: ",id);
    useEffect(()=>{
        async function getDraft(params) {
            const res= await axios.get(`http://localhost:3000/draft/${params}`, {
                headers: {
                  "x-auth-token": cookies.token,
                },
              });
              const draft = await res.data; 
              console.log("res.data: ", draft)
              setDraft(draft);

        }
        getDraft(id);

    },[])

    function loaded(){
        return(
            <>
            <LogoutBtn/>
            <h1>{draft.title}</h1>
            
            </>
        )
    }

    function loading(){
        return <><h3>Loading</h3></>
    }
    

    return draft? loaded():loading();
}