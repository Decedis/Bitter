import { Favorites, Post } from "../types";

import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { PostButton } from "./PostButton";
import { useContext, useState } from "react";
import { UserContext } from "../Providers/FakeAuthProvider";
import { useFavorites, usePosts, useUser } from "../services/queries";
import {
  useCreateFavorite,
  useDeleteFavorite,
  usePatchPost,
} from "../services/mutations";
import { CommentsList } from "./CommentsList";
import { findAuthorName } from "../utils";
import { useDeletePosts } from "../services/mutations";
import { PatchPostModal } from "./PatchPostModal";

export const PostCard = ({
  createdByID,
  postContent,
  comments,
  likes,
  id,
}: Post) => {
  const [isEditPost, setIsEditPost] = useState(false);
  const favQuery = useFavorites();
  const userQuery = useUser();
  const postsQuery = usePosts();
  const { user } = useContext(UserContext);
  const { trigger: createFavoriteTrigger } = useCreateFavorite();
  const { trigger: deleteFavoriteTrigger } = useDeleteFavorite();
  const { trigger: deletePostTrigger } = useDeletePosts();

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

  //TODO: this findFavoriteID and the one in CommentCard might be able to be refactored into a single function
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

  // const deleteButtonCSS = user
  //   ? "bg-blue-500 rounded-full w-8 h-8 self-center"
  //   : "opacity-0";

  const deleteButton =
    user?.id === createdByID ? (
      <button
        onClick={() => {
          deletePostTrigger(id, {
            optimisticData:
              postsQuery.data &&
              postsQuery.data.filter((post) => post.id !== id),
            rollbackOnError: true,
          });
        }}
      >
        Delete
      </button>
    ) : (
      <></>
    );

  const postDropDownMenu =
    user?.id === createdByID ? (
      <div className="dropdown dropdown-right">
        <div tabIndex={0}>
          <EllipsisVerticalIcon className="w-5 h-5" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>{deleteButton}</a>
          </li>
          <li>
            <button className="btn" onClick={() => setIsEditPost(true)}>
              Edit
            </button>
          </li>
        </ul>
      </div>
    ) : (
      <></>
    );

  return (
    <div
      key={id}
      className="card w-96 rounded-sm bg-neutral text-primary-content p-2 text-white "
    >
      <h3 className="flex flex-row gap-2 border-b-2 border-white text-white justify-between pb-1">
        <div className="flex flex-row gap-2">
          <div className="avatar">
            <div className="w-12 rounded-xl">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="card-title ">
            {findAuthorName(createdByID, userQuery)}
          </div>
        </div>
        {postDropDownMenu}
      </h3>
      <div className="postContent text-white w-full h-40">
        {isEditPost ? (
          <PatchPostModal defaultValue={postContent} />
        ) : (
          postContent
        )}
      </div>

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
    </div>
  );
};
