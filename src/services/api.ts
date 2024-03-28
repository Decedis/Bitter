import { Comments, Favorites, ProtoPost } from "../types";
import { axiosInstance } from "./fetcher";

export const createPost = async (
  url: string,
  { arg }: { arg: Omit<ProtoPost, "id"> }
) => {
  await axiosInstance.post(url, {
    postContent: arg.postContent,
    createdByID: arg.createdByID,
    creationTime: arg.creationTime,
  });
};

export const createComment = async (
  url: string,
  { arg }: { arg: Omit<Comments, "id"> }
) => {
  await axiosInstance.post(url, {
    userId: arg.userId,
    postId: arg.postId,
    commentContent: arg.commentContent,
  });
};

export const createFavorite = async (
  url: string,
  { arg }: { arg: Omit<Favorites, "id"> }
) => {
  await axiosInstance.post(url, {
    userId: arg.userId,
    postId: arg.postId,
  });
};

export const deleteFavorite = async (url: string, { arg }: { arg: number }) => {
  await axiosInstance.delete(`${url}/${arg}`);
};
