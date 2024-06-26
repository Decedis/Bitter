import useSWRMutation from "swr/mutation";
import {
  useBookmarks,
  useComments,
  useFavorites,
  usePosts,
  useUser,
} from "./queries";
import {
  createBookmark,
  createComment,
  createCommentFavorite,
  createFavorite,
  createPost,
  createUser,
  deleteBookmark,
  deleteComment,
  deleteCommentFavorite,
  deleteFavorite,
  deletePost,
  patchComment,
  patchPost,
  patchUserProfilePicture,
} from "./api";

//TODO: create a useMutation hook

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

export const useDeletePosts = () => {
  const { mutate } = usePosts();
  return useSWRMutation("/posts", deletePost, {
    onError() {
      console.error("error");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const usePatchPost = () => {
  const { mutate } = usePosts();
  return useSWRMutation("/posts", patchPost, {
    onError(err) {
      console.log("error");
      console.log(err);
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const usePatchUserProfilePicture = () => {
  const { mutate } = useUser();
  return useSWRMutation("/users", patchUserProfilePicture, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      console.log("success");

      mutate();
    },
  });
};

export const useCreateComment = () => {
  const { mutate } = useComments();
  return useSWRMutation("/comments", createComment, {
    onError() {
      console.log("comment not set");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const usePatchComment = () => {
  const { mutate } = useComments();
  return useSWRMutation("/comments", patchComment, {
    onError() {
      console.log("comment not set");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const useDeleteComment = () => {
  const { mutate } = useComments();
  return useSWRMutation("/comments", deleteComment, {
    onError() {
      console.log("comment not deleted");
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

export const useCreateCommentFavorite = () => {
  const { mutate } = useComments();
  return useSWRMutation("/commentFavorites", createCommentFavorite, {
    onError() {
      console.log("comment favorite not set");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const useDeleteCommentFavorite = () => {
  const { mutate } = useComments();
  return useSWRMutation("/commentFavorites", deleteCommentFavorite, {
    onError() {
      console.log("comment favorite not deleted");
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

export const useCreateBookmark = () => {
  const { mutate } = useBookmarks();
  return useSWRMutation("/bookmarks", createBookmark, {
    onError() {
      console.log("bookmark not created");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const useDeleteBookmark = () => {
  const { mutate } = useBookmarks();
  return useSWRMutation("/bookmarks", deleteBookmark, {
    onError() {
      console.log("bookmark not deleted");
    },
    onSuccess: () => {
      mutate();
    },
  });
};

export const useCreateUser = () => {
  const { mutate } = useBookmarks();
  return useSWRMutation("/users", createUser, {
    onError() {
      console.log("user not created");
    },
    onSuccess: () => {
      mutate();
    },
  });
};
