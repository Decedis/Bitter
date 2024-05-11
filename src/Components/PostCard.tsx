import { Post } from "../types";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRequiredUser } from "../Providers/FakeAuthProvider";
import {
  useBookmarks,
  useCommentFavorites,
  useComments,
  useFavorites,
  usePosts,
  useUser,
} from "../services/queries";

import { findAuthorName } from "../utils";
import {
  useDeleteBookmark,
  useDeleteComment,
  useDeleteCommentFavorite,
  useDeleteFavorite,
  useDeletePosts,
} from "../services/mutations";
import { PatchPost } from "./PatchPost";
import { PostBar } from "./PostBar";
import { Link } from "react-router-dom";

export const PostCard = ({
  createdByID,
  postContent,
  comments,
  likes,
  id,
}: Post) => {
  const [isEditPost, setIsEditPost] = useState(false);
  const userQuery = useUser();
  const postsQuery = usePosts();
  const user = useRequiredUser();

  const { trigger: deletePostTrigger } = useDeletePosts();
  const { trigger: deleteCommentTrigger } = useDeleteComment();
  const { trigger: deleteFavoriteTrigger } = useDeleteFavorite();
  const { trigger: deleteCommentFavoriteTrigger } = useDeleteCommentFavorite();
  const { trigger: deleteBookmarkTrigger } = useDeleteBookmark();

  const commentsQuery = useComments();
  const favQuery = useFavorites();
  const commentFavQuery = useCommentFavorites();
  const bookmarkQuery = useBookmarks();

  const profileImage = () => {
    const foundUser = userQuery.data?.find((user) => user.id === createdByID);
    return foundUser
      ? foundUser.profilePicture
      : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
  };

  const deleteButtonOperation = () => {
    deletePostTrigger(id, {
      optimisticData:
        postsQuery.data && postsQuery.data.filter((post) => post.id !== id),
      rollbackOnError: true,
    });
    commentsQuery.data?.map((comment) => {
      if (comment.postId === id) {
        deleteCommentTrigger(comment.id, {
          optimisticData:
            commentsQuery.data &&
            commentsQuery.data.filter((comment) => comment.postId !== id),
          rollbackOnError: true,
        });
        commentFavQuery.data?.map((comFav) => {
          if (comFav.commentId === comment.id) {
            deleteCommentFavoriteTrigger(comFav.id, {
              optimisticData:
                commentFavQuery.data &&
                commentFavQuery.data.filter(
                  (comFav) => comFav.commentId !== comment.id
                ),
              rollbackOnError: true,
            });
          }
        });
      }
    });
    bookmarkQuery.data?.map((bookmark) => {
      //On occasion a bug occurs that fails to delete the data. Can't reliably reproduce
      if (bookmark.postId === id) {
        deleteBookmarkTrigger(bookmark.id, {
          optimisticData:
            bookmarkQuery.data &&
            bookmarkQuery.data.filter((bookmark) => bookmark.postId !== id),
          rollbackOnError: true,
        });
      }
    });
    favQuery.data?.map((fav) => {
      if (fav.postId === id) {
        deleteFavoriteTrigger(fav.id, {
          optimisticData:
            favQuery.data && favQuery.data.filter((fav) => fav.postId !== id),
          rollbackOnError: true,
        });
      }
    });
  };

  const postDropDownMenu = (
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
            onClick={
              user.id === createdByID ? deleteButtonOperation : undefined
            }
          >
            Delete
          </button>
        </li>
        <li>
          <button className="btn" onClick={() => setIsEditPost(true)}>
            Edit
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div
      key={id}
      className="card w-96 rounded-sm bg-neutral text-primary-content p-2 text-white"
    >
      <h3 className="flex flex-row gap-2 border-b-2 border-white text-white justify-between pb-1 items-center">
        <div className="flex flex-row gap-2">
          <div className="avatar">
            <Link className="w-12 h-12" to={`/profile/${createdByID}`}>
              <img className="rounded-xl" src={profileImage()} />
            </Link>
          </div>
          <div className="card-title ">
            {findAuthorName(createdByID, userQuery)}
          </div>
        </div>
        {user?.id === createdByID ? postDropDownMenu : null}
      </h3>
      <div className="postContent text-white w-full h-40">
        {isEditPost ? (
          <PatchPost
            defaultValue={postContent}
            id={id}
            closePatch={setIsEditPost}
          />
        ) : (
          postContent
        )}
      </div>
      {isEditPost ? (
        <></>
      ) : (
        <PostBar comments={comments} likes={likes} id={id} />
      )}
    </div>
  );
};
