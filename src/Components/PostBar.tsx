import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { Bookmark, Comments, Favorites } from "../types";
import { CommentsList } from "./CommentsList";
import { PostButton } from "./PostButton";
import { useContext, useState } from "react";
import {
  useCreateBookmark,
  useCreateFavorite,
  useDeleteBookmark,
  useDeleteFavorite,
} from "../services/mutations";
import { useBookmarks, useFavorites } from "../services/queries";
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
  const bookmarkQuery = useBookmarks();
  const { trigger: createFavoriteTrigger } = useCreateFavorite();
  const { trigger: deleteFavoriteTrigger } = useDeleteFavorite();
  const { trigger: createBookmarkTrigger } = useCreateBookmark();
  const { trigger: deleteBookmarkTrigger } = useDeleteBookmark();

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

  const isBookmarkActive = (localId: string, bookmarkQuery: Bookmark[]) => {
    // const newArr = (bookmarkQuery ?? []).filter((bookmark) => {
    //   return bookmark.postId === localId;
    // });
    const newArr = (bookmarkQuery ?? []).filter((bookmark) => {
      return bookmark.userId === user?.id;
    });
    console.log("newArr activeMark: ", newArr);

    //TODO refactor =>
    //BUG =>> db shape is incorrect. bookmarkId should be postId
    //Find bug, it is on the mutation somewhere.

    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].postId === localId) {
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

  const findBookmarkID = (postID: string, userID: string) => {
    const bookmarkID = bookmarkQuery.data?.find((bookmark) => {
      return postID === bookmark.postId && userID === bookmark.userId;
    });
    return bookmarkID;
  };

  const handleBookmarkCreation = async () => {
    if (user) {
      if (isBookmarkActive(id, bookmarkQuery.data as Bookmark[])) {
        const bookmarkID = findBookmarkID(id, user?.id);
        if (bookmarkID && bookmarkID.id) {
          deleteBookmarkTrigger(bookmarkID.id, {
            optimisticData:
              bookmarkQuery.data &&
              bookmarkQuery.data.filter(
                (bookmark) => bookmark.id !== bookmark.id
              ),
            rollbackOnError: true,
          });
        }
      } else {
        createBookmarkTrigger(
          {
            postId: id,
            userId: user?.id,
          },
          {
            optimisticData: bookmarkQuery.data && [
              ...bookmarkQuery.data,
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
  console.log(
    "bookmark active: ",
    isBookmarkActive(id, bookmarkQuery.data as Bookmark[])
  );

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
        <PostButton
          icon={
            <BookmarkIcon
              className={
                isBookmarkActive(id, bookmarkQuery.data as Bookmark[])
                  ? "fill-cyan-400"
                  : ""
              }
            />
          }
          onClickEvent={() => {
            return handleBookmarkCreation();
          }}
        />
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
