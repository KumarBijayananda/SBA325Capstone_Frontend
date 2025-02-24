import axios from "axios";
import { useEffect } from "react"


export default function Versions({id, cookies}){

    
useEffect (()=>{
    try {
        async function getVersions(id) {
            const res= await axios.get(`http://localhost:3000/archive/${id}`, {
                headers: {
                "x-auth-token": cookies.token,
                },
            });
            const versions = await res.data;
            console.log(versions)
        }

        getVersions(id)

    } catch (error) {
        console.log(error);
    }
},[])


    return (
        <>
            <p>Previous Versions</p>
        </>
    )
}