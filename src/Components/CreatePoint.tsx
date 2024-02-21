import { useState } from "react";
import { Category, Point } from "../types";

const defaultPoint: Omit<Point, "id"> = {
  URL: "",
  title: "",
  description: "",
  category: "",
  poster: "",
  value: 0,
  public: false,
  tag: "",
};
const defaultCategories: Omit<Category, "id"> = {
  categories: [
    "engineer",
    "professor",
    "mentor",
    "banker",
    "web developer",
    "writer",
    "philosopher",
    "cook",
  ],
};

export const CreatePoint = () => {
  const [newPoint, setNewPoint] = useState<Omit<Point, "id">>(defaultPoint);
  return (
    <form
      action=""
      id="create-point"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="formDivider">
        <label htmlFor="URL">
          <input type="text" name="point" id="" />
          <input
            type="text"
            id="URL"
            value={newPoint.URL}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPoint({ ...newPoint, URL: e.target.value })
            }
            required
          />
        </label>
      </div>
      <div className="formDivider">
        <label htmlFor="title">
          <input type="text" name="point" id="" />
          <input
            type="text"
            id="title"
            value={newPoint.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPoint({ ...newPoint, title: e.target.value })
            }
            required
          />
        </label>
      </div>
      <div className="formDivider">
        <label htmlFor="description">
          <input type="text" name="point" id="" />
          <input
            type="text"
            id="description"
            value={newPoint.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPoint({ ...newPoint, description: e.target.value })
            }
            required
          />
        </label>
      </div>
      <div className="formDivider">
        <label htmlFor="category">
          <input type="text" name="point" id="" />
          <select
            id=""
            value={newPoint.category}
            onChange={(e) => {
              setNewPoint({ ...newPoint, category: e.target.value });
            }}
          >
            {Object.entries(defaultCategories.categories).map(
              ([label, categoryValue]) => {
                return (
                  <option value={categoryValue} key={categoryValue}>
                    {label}
                  </option>
                );
              }
            )}
          </select>
        </label>
      </div>
      <div className="formDivider">
        <label htmlFor="tag">
          <input type="text" name="point" id="" />
          <input
            type="text"
            id="URL"
            value={newPoint.tag}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPoint({ ...newPoint, tag: e.target.value })
            }
            required
          />
        </label>
      </div>
    </form>
  );
};
