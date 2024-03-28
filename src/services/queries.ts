import useSWR from "swr";
import {
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
  // Enable splash screen to login through logic below
  //   const { data } = useUser();
  //   return useSWR<Post[]>(data ? "/posts" : null);
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

export const useTags = () => {
  return useSWR<Tag[]>("/tags");
};
