import { Point } from "../types";

export const PointCard = ({
  URL,
  title,
  category,
  tag,
  description,
  value,
}: Omit<Point, "id">) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="url">{URL}</div>
      <div className="category">{category}</div>
      <div className="tags">{tag}</div>
      <div className="description">{description}</div>
      <div className="commentCount">0</div>
      <div className="valueScore">{value}</div>
      <input type="text" name="comment" id="comments" />
      <button>Add Comment</button>
    </div>
  );
};
