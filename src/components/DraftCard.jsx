//DraftCard component to create drafts that will be return to dashboard

//Dependencies
import { Link } from "react-router-dom";

export default function DraftCard({ draft }) {

  //create each draft as a link so user can click to open it
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
