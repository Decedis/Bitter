import { ReactNode, createContext, useState } from "react";
import { Point } from "../types";

type TAllPoints = {
  allPoints: Point[];
  setAllPoints: (input: Point[]) => void;
};
export const AllPointContext = createContext<TAllPoints>({
  allPoints: [],
  setAllPoints: (points: Point[]): Point[] => points,
});

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [allPoints, setAllPoints] = useState<Point[]>([] as Point[]);

  return (
    <AllPointContext.Provider value={{ allPoints, setAllPoints }}>
      {children}
    </AllPointContext.Provider>
  );
};
