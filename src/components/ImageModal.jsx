import { useEffect, useState } from "react";
import axios from   "axios";

export default function ImageModal({ isOpen, onClose }){
    const[photos, setPhotos]=useState([]);

    useEffect(()=>{
        if(isOpen){
            getImages(randomPage, 3);
        }
    },[isOpen])

    async function getImages(page=1, perPage=3){
        try {
            const res= await axios("https://api.pexels.com/v1/curated", {
        params: { page, per_page: perPage },
        headers: { Authorization: import.meta.env.VITE_API_KEY},
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