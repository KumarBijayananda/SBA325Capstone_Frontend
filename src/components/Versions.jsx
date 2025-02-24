import axios from "axios";
import { useEffect, useState } from "react";

export default function Versions({ id, cookies }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    if (id) {
      
        async function getVersions(id) {
            try {
          const res = await axios.get(`http://localhost:3000/archive/${id}`, {
            headers: {
              "x-auth-token": cookies.token,
            },
          });
          const newVersion = await res.data;
          console.log("version",newVersion);
          setVersions(newVersion);
      } catch (error) {
        console.log(error);
      }
    }
    
    getVersions(id);

    }
  }, []);

  return versions?(
    <>
      <p className="versionHead">Previous Versions</p>
      <div className="versionDiv">
        <ul>
          {versions.map((version, index)=>(
                    <li className="version" key={index}>
                        {new Date(version.updatedAt).toDateString()}{" "}
                        {new Date(version.updatedAt)
                          .toTimeString({ hour12: false })
                          .split(" ")[0]
                      }</li>
                ))}
        </ul>
      </div>
    </>
  ):(<p>No previous versions</p>)
}
