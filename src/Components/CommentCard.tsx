import { EllipsisVerticalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useCommentFavorites, useComments, useUser } from "../services/queries";
import { CommentFavorites, Comments } from "../types";
import { findAuthorName } from "../utils";
import { PostButton } from "./PostButton";
import { useState } from "react";
import { useRequiredUser } from "../Providers/FakeAuthProvider";
import {
  useCreateCommentFavorite,
  useDeleteComment,
  useDeleteCommentFavorite,
} from "../services/mutations";
import { PatchComment } from "./PatchComment";

export const CommentCard = ({ id, userId, commentContent }: Comments) => {
  const [isEditComment, setIsEditComment] = useState(false);

  const userQuery = useUser();
  const commentsQuery = useComments();
  const commentFavQuery = useCommentFavorites();
  const user = useRequiredUser();
  const { trigger: createCommentFavoriteTrigger } = useCreateCommentFavorite();
  const { trigger: deleteCommentFavoriteTrigger } = useDeleteCommentFavorite();
  const { trigger: deleteCommentsTrigger } = useDeleteComment();

  const commentDropDownMenu = (
    <div className="dropdown dropdown-right">
      <div tabIndex={0}>
        <EllipsisVerticalIcon className="w-5 h-5" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            className="btn"
            onClick={() => {
              deleteCommentsTrigger(id, {
                optimisticData:
                  commentsQuery.data &&
                  commentsQuery.data.filter((post) => post.id !== id),
                rollbackOnError: true,
              });
              commentFavQuery.data?.map((comFav) => {
                if (comFav.commentId === id) {
                  deleteCommentFavoriteTrigger(comFav.id, {
                    optimisticData:
                      commentFavQuery.data &&
                      commentFavQuery.data.filter(
                        (comFav) => comFav.commentId !== id
                      ),
                    rollbackOnError: true,
                  });
                }
              });
            }}
          >
            Delete
          </button>
        </li>
        <li>
          <button className="btn" onClick={() => setIsEditComment(true)}>
            Edit
          </button>
        </li>
      </ul>
    </div>
  );

  const isCommentHeartActive = (
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
  };

  const commentLikes = (
    localId: string,
    commentFavQuery: CommentFavorites[]
  ) => {
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
    if (user.id) {
      if (
        isCommentHeartActive(id, commentFavQuery.data as CommentFavorites[])
      ) {
        const favoriteID = findFavoriteID(id, user.id);
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
    <div
      className="bg-blue-800 mb-4 p-2 rounded-md  flex flex-col justify-center"
      key={id}
    >
      {isEditComment ? (
        <PatchComment
          closePatch={setIsEditComment}
          id={id}
          defaultValue={commentContent}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <div>@{findAuthorName(userId, userQuery)}</div>
            {user?.id === userId ? commentDropDownMenu : null}
          </div>
          <div>{commentContent}</div>
          <div className="flex bg-blue-500 rounded-md m-1 mt-4 p-1 justify-end">
            <PostButton
              icon={
                <HeartIcon
                  className={
                    isCommentHeartActive(
                      id,
                      commentFavQuery.data as CommentFavorites[]
                    )
                      ? "fill-red-400"
                      : ""
                  }
                />
              }
              onClickEvent={() => {
                return handleCreateCommentFavorite();
              }}
              value={
                commentLikes(id, commentFavQuery.data as CommentFavorites[])
                  .length
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
