import { Link } from "react-router-dom";

export default function DraftCard({ draft }) {
  return (
    <>
    <Link to={`/draft/${draft._id}`} style={{textDecoration:"none"}}>
      <div className="draftCard">
        <h3 className="cardTitle">{draft.title}</h3>
        <p className="cardBody"> {draft.body}</p>
      </div>
    </Link>
    </>
  );
}
