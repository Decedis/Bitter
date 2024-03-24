import useSWRMutation from "swr/mutation";
import { useFavorites, usePosts } from "./queries";
import { createFavorite, createPost, deleteFavorite } from "./api";

export const useCreatePosts = () => {
  const { mutate } = usePosts();
  return useSWRMutation("/posts", createPost, {
    onError() {
      console.error("error");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const useCreateFavorite = () => {
  const { mutate } = useFavorites();
  return useSWRMutation("/favorites", createFavorite, {
    onError() {
      console.log("favorite not set");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const useDeleteFavorite = () => {
  const { mutate } = useFavorites();
  return useSWRMutation("/favorites", deleteFavorite, {
    onError() {
      console.log("favorite not deleted");
    },
    onSuccess: () => {
      mutate();
    },
  });
};
