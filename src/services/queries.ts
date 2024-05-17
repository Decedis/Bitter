import useSWR from "swr";
import {
  Bookmark,
  CommentFavorites,
  Comments,
  Favorites,
  Post,
  Tag,
  User,
} from "../types";

export const useUser = () => {
  return useSWR<User[]>("/users");
};

export const usePosts = () => {
  return useSWR<Post[]>("/posts");
};

export const useFavorites = () => {
  return useSWR<Favorites[]>("/favorites");
};

export const useComments = () => {
  return useSWR<Comments[]>("/comments");
};

export const useCommentFavorites = () => {
  return useSWR<CommentFavorites[]>("/commentFavorites");
};

export const useBookmarks = () => {
  return useSWR<Bookmark[]>("/bookmarks");
};

export const useTags = () => {
  return useSWR<Tag[]>("/tags");
};
