import { CommentFavorites, Comments, Favorites, ProtoPost } from "../types";
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

export const deletePost = async (url: string, { arg }: { arg: string }) => {
  await axiosInstance.delete(`${url}/${arg}`);
};

export const patchPost = async (url: string, { arg }: { arg: string }) => {
  await axiosInstance.patch(`${url}/${arg}`);
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

export const createCommentFavorite = async (
  url: string,
  { arg }: { arg: Omit<CommentFavorites, "id"> }
) => {
  await axiosInstance.post(url, {
    userId: arg.userId,
    commentId: arg.commentId,
  });
};

export const deleteFavorite = async (url: string, { arg }: { arg: string }) => {
  await axiosInstance.delete(`${url}/${arg}`);
};

export const deleteCommentFavorite = async (
  url: string,
  { arg }: { arg: string }
) => {
  await axiosInstance.delete(`${url}/${arg}`);
};
