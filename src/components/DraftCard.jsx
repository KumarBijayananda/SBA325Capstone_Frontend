import { Link } from "react-router-dom";

export default function DraftCard({ draft }) {
  return (
    <>
    <Link to={`/draft/${draft.id}`} style={{textDecoration:"none"}}>
      <div className="draftCard">
        <h4 className="cardTitle">{draft.title}</h4>
        <p className="cardBody"> {draft.body}</p>
      </div>
    </Link>
    </>
  );
}
