import { HeartIcon } from "@heroicons/react/24/outline";
import { useCommentFavorites, useUser } from "../services/queries";
import { CommentFavorites, Comments } from "../types";
import { findAuthorName } from "../utils";
import { PostButton } from "./PostButton";
import { useContext } from "react";
import { UserContext } from "../Providers/FakeAuthProvider";
import {
  useCreateCommentFavorite,
  useDeleteCommentFavorite,
} from "../services/mutations";

export const CommentCard = ({
  id,
  userId,
  commentContent,
  postId,
}: Comments) => {
  const userQuery = useUser();
  const commentFavQuery = useCommentFavorites();
  const { user } = useContext(UserContext);
  const { trigger: createCommentFavoriteTrigger } = useCreateCommentFavorite();
  const { trigger: deleteCommentFavoriteTrigger } = useDeleteCommentFavorite();

  console.log("I'm not using postID: ", postId);

  const isHeartActive = (
    localId: string,
    commentFavQuery: CommentFavorites[]
  ) => {
    const newArr = (commentFavQuery ?? []).filter((fav) => {
      return fav.commentId === localId;
    });
    for (let i = 0; i < newArr.length; i++) {
      if (user?.id === newArr[i].userId) {
        return true;
      }
    }
    if (!user) {
      return false;
    }
  };

  const cardLikes = (localId: string, commentFavQuery: CommentFavorites[]) => {
    const newArr = (commentFavQuery ?? []).filter((fav) => {
      return fav.commentId === localId;
    });
    return newArr;
  };

  const findFavoriteID = (commentID: string, userID: string) => {
    const favID = commentFavQuery.data?.find((favorite) => {
      return commentID === favorite.commentId && userID === favorite.userId;
    });
    return favID;
  };

  const handleCreateCommentFavorite = async () => {
    if (user) {
      if (isHeartActive(id, commentFavQuery.data as CommentFavorites[])) {
        const favoriteID = findFavoriteID(id, user?.id);
        if (favoriteID && favoriteID.id) {
          deleteCommentFavoriteTrigger(favoriteID.id, {
            optimisticData:
              commentFavQuery.data &&
              commentFavQuery.data.filter((fav) => fav.id !== favoriteID.id),
            rollbackOnError: true,
          });
        }
      } else {
        createCommentFavoriteTrigger(
          {
            commentId: id,
            userId: user?.id,
          },
          {
            optimisticData: commentFavQuery.data && [
              ...commentFavQuery.data,
              { commentId: id, userId: user?.id },
            ],
            rollbackOnError: true,
          }
        );
      }
    } else {
      console.log("No user found");
    }
  };

  return (
    <div className="bg-blue-800 mb-4 p-2 rounded-md" key={id}>
      <div>@{findAuthorName(userId, userQuery)}</div>
      <div>{commentContent}</div>
      <div className="flex bg-blue-500 rounded-md m-1 mt-4 p-1 justify-end">
        <PostButton
          icon={
            <HeartIcon
              className={
                isHeartActive(id, commentFavQuery.data as CommentFavorites[])
                  ? "fill-red-400"
                  : ""
              }
            />
          }
          onClickEvent={() => {
            return handleCreateCommentFavorite();
          }}
          value={
            cardLikes(id, commentFavQuery.data as CommentFavorites[]).length
          }
        />
      </div>
    </div>
  );
};
