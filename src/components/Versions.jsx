import { Link } from "react-router-dom";

export default function Versions({ versions, quillInstance }) {


  function handleVersion(index, e) {
    e.preventDefault();

    if (quillInstance.current) {
    quillInstance.current.root.innerHTML = versions[index].body;
  }
  }

  return versions.length > 0 ? (
    <>
      <p className="versionHead" style={{textDecoration:'underline'}}> Previous Versions </p>
      <div className="versionDiv">
        <ul>
          {versions.map((version, index) => (
            <li key={version.updatedAt} className="version">
              <Link to="#" onClick={(e) => handleVersion(index, e)}>
                {new Date(version.updatedAt).toLocaleDateString()}{" "}
                {new Date(version.updatedAt).toLocaleTimeString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <p style={{textDecoration:'underline'}}> No previous versions </p>
  );
}
