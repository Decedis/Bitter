import { Comment } from "./types";
const baseURL = "http://localhost:3000";

const getAllComments = (): Promise<Comment[]> => {
  return fetch(baseURL + "/comments").then((res) => res.json()) as Promise<
    Comment[]
  >;
};

const postComment = async (comment: Omit<Comment, "id">) => {
  const res = await fetch(baseURL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  return (await res.json()) as Promise<Comment[]>;
};
const deleteComment = (id: number) => {
  return fetch(`${baseURL}/comment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const patchFavoriteComment = (id: number, newData: Partial<Comment>) => {
  return fetch(`${baseURL}/comment/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newData }),
  });
};

export const Requests = {
  postComment,
  deleteComment,
  patchFavoriteComment,
  getAllComments,
};
