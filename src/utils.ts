import { SWRResponse } from "swr";
import { Comments, Favorites, User } from "./types";

export const findAuthorName = (
  createdByID: string,
  userQuery: SWRResponse<User[]>
) => {
  const authorName = userQuery.data?.find((user) => user.id === createdByID);
  return authorName?.userName;
};

export const cardLikes = (localId: string, favQuery: Favorites[]) => {
  const newArr = (favQuery ?? []).filter((fav) => {
    return fav.postId === localId;
  });
  return newArr;
};

export const postComments = (
  id: string,
  commentsQuery: SWRResponse<Comments[]>
) => {
  return commentsQuery?.data
    ? commentsQuery.data.filter((comments: Comments) => comments.postId === id)
    : ([] as Comments[]);
};
