import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { Comments, Favorites } from "../types";
import { CommentsList } from "./CommentsList";
import { PostButton } from "./PostButton";
import { useContext, useState } from "react";
import { useCreateFavorite, useDeleteFavorite } from "../services/mutations";
import { useFavorites } from "../services/queries";
import { UserContext } from "../Providers/FakeAuthProvider";

export const PostBar = ({
  comments,
  likes,
  id,
}: {
  likes: number;
  comments: Comments[];
  id: string;
}) => {
  const { user } = useContext(UserContext);
  const favQuery = useFavorites();
  const { trigger: createFavoriteTrigger } = useCreateFavorite();
  const { trigger: deleteFavoriteTrigger } = useDeleteFavorite();
  const [isCommentsCollapsed, setIsCommentsCollapsed] = useState(true);

  const handleToggleComments = () => {
    setIsCommentsCollapsed((prev) => !prev);
  };

  const isHeartActive = (localId: string, favQuery: Favorites[]) => {
    const newArr = (favQuery ?? []).filter((fav) => {
      return fav.postId === localId;
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
  const findFavoriteID = (postID: string, userID: string) => {
    const favID = favQuery.data?.find((favorite) => {
      return postID === favorite.postId && userID === favorite.userId;
    });
    return favID;
  };

  const handleFavoriteCreation = async () => {
    if (user) {
      if (isHeartActive(id, favQuery.data as Favorites[])) {
        const favoriteID = findFavoriteID(id, user?.id);
        if (favoriteID && favoriteID.id) {
          deleteFavoriteTrigger(favoriteID.id, {
            optimisticData:
              favQuery.data &&
              favQuery.data.filter((fav) => fav.id !== favoriteID.id),
            rollbackOnError: true,
          });
        }
      } else {
        createFavoriteTrigger(
          {
            postId: id,
            userId: user?.id,
          },
          {
            optimisticData: favQuery.data && [
              ...favQuery.data,
              { postId: id, userId: user?.id },
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
    <>
      <div className="flex justify-between self-center w-full text-white mb-4">
        <PostButton
          icon={<ChatBubbleOvalLeftIcon />}
          value={comments.length}
          onClickEvent={handleToggleComments}
        />
        <PostButton
          icon={
            <HeartIcon
              className={
                isHeartActive(id, favQuery.data as Favorites[])
                  ? "fill-red-400"
                  : ""
              }
            />
          }
          onClickEvent={() => {
            return handleFavoriteCreation();
          }}
          value={likes}
        />
        <PostButton icon={<BookmarkIcon />} />
      </div>
      {comments && (
        <CommentsList
          collapsed={isCommentsCollapsed}
          postId={id}
          commentsList={comments}
        />
      )}
    </>
  );
};
