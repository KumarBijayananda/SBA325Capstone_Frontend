import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Versions({ versions, setContent}) {

  
function handleVersion(index, e){
    e.preventDefault();
    setContent(versions[index].body)
}

  return versions? (
    <>
      <p className="versionHead">Previous Versions</p>
      <div className="versionDiv">
        <ul>
          {versions.map((version, index) => (

            <Link to={`/draft/`} onClick={()=>handleVersion(index)} key={version.updatedAt}>
            <li className="version" key={version.updatedAt}>
              {new Date(version.updatedAt).toDateString()}{" "}
              {
                new Date(version.updatedAt)
                  .toTimeString({ hour12: false })
                  .split(" ")[0]
              }
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <p>No previous versions</p>
  );
}
