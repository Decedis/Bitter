// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://cbrfwqtzdrslzictrtdm.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
// //TODO finish setting up supabase

import { Point } from "./types";

const baseURL = "http://localhost:3000";

const getAllPoints = (): Promise<Point[]> => {
  return fetch(baseURL + "/points").then((res) => res.json()) as Promise<
    Point[]
  >;
};

const postPoint = async (point: Omit<Point, "id">) => {
  const res = await fetch(baseURL + "/points", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(point),
  });
  return (await res.json()) as Promise<Point[]>; //TODO update to match param sig
};
const deletePointRequest = (id: number) => {
  return fetch(`${baseURL}/points/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const patchFavoritePoint = (id: number, newData: Partial<Point>) => {
  return fetch(`${baseURL}/points/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newData }),
  });
};

export const Requests = {
  postPoint,
  deletePointRequest,
  patchFavoritePoint,
  getAllPoints,
};
