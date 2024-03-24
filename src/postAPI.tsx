import { Post } from "./types";

const baseURL = "http://localhost:3000";

const getAllPosts = (): Promise<Post[]> => {
  return fetch(baseURL + "/posts").then((res) => res.json()) as Promise<Post[]>;
};

const postPost = async (post: Omit<Post, "id">) => {
  const res = await fetch(baseURL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return (await res.json()) as Promise<Post[]>;
};
const deletePostRequest = (id: number) => {
  return fetch(`${baseURL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const patchFavoritePost = (id: number, newData: Partial<Post>) => {
  return fetch(`${baseURL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newData }),
  });
};

export const Requests = {
  postPost,
  deletePostRequest,
  patchFavoritePost,
  getAllPosts,
};
