import { useContext } from "react";
import { PointCard } from "./PointCard";
import { Point } from "../types";
import { AllPointContext } from "../Providers/PointsProviders";

export const PointFeed = () => {
  const { allPoints } = useContext(AllPointContext);
  return (
    <div>
      {allPoints.map((point: Point) => (
        <PointCard
          URL={point.URL}
          title={point.title}
          category={point.category}
          poster={point.poster}
          tag={point.tag}
          description={point.description}
          value={point.value}
          public={point.public}
        />
      ))}
    </div>
  );
};
