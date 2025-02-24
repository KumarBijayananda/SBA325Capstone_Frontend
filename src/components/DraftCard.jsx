import { Link } from "react-router-dom";
import Quill from "quill";

export default function DraftCard({ draft }) {

  return (
    <>
    <Link to={`/draft/${draft._id}`} style={{textDecoration:"none"}}>
      <div className="draftCard">
        <div
          className="cardBody"
          dangerouslySetInnerHTML={{ __html: draft.body }}
        ></div>
      </div>
    </Link>
    </>
  );
}
