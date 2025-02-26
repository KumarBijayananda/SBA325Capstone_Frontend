import { useEffect, useState } from "react";
import axios from   "axios";

export default function ImageModal({ isOpen, onClose }){
    const[photos, setPhotos]=useState([]);
    const API_KEY="3NhsMzZjROb3VBdXXMjm5Vt9XDLMVmbDNQMZcPSAS2fAL6YW1quNdBwx";

    useEffect(()=>{
        if(isOpen){
            getImages(randomPage, 6);
        }
    },[isOpen])

    async function getImages(page=1, perPage=6){
        try {
            const res= await axios("https://api.pexels.com/v1/curated", {
        params: { page, per_page: perPage },
        headers: { Authorization: API_KEY },
      });
      setPhotos(res.data.photos);
        } catch (error) {
            console.log(error)
        }

    }
    const randomPage = Math.floor(Math.random() * 50) + 1;
    if(!isOpen) return null;
    
    return (
        <>
        <div className="modalContainer">
            <div className="modalBox">
                <button className="closeBtn" onClick={onClose}>X</button>
                <h3>Images for your inspiration</h3>
                <div className="images">
                    {
                        photos.map((photo)=>(
                            <img key={photo.id} src={photo.src.medium} alt="inspiring image" />
                        ))
                    }
                </div>
            </div>
        </div>
        
        </>
    )
    
}