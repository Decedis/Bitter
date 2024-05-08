import { Post } from "../types";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { UserContext } from "../Providers/FakeAuthProvider";
import { usePosts, useUser } from "../services/queries";

import { findAuthorName } from "../utils";
import { useDeletePosts } from "../services/mutations";
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
  const { user } = useContext(UserContext);

  const { trigger: deletePostTrigger } = useDeletePosts();

  const profileImage = () => {
    const foundUser = userQuery.data?.find((user) => user.id === createdByID);
    return foundUser
      ? foundUser.profilePicture
      : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
  };

  //   return  user.profilePicture
  // } else {
  //   return "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
  // }

  // const foundUser = userQuery.data?.find((user) => user.id === createdByID);

  // const profileImage = foundUser
  //   ? foundUser.profilePicture
  //   : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
  // console.log(profileImage);

  //TODO: this findFavoriteID and the one in CommentCard might be able to be refactored into a single function
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
          <li>{deleteButton}</li>
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
      className="card w-96 rounded-sm bg-neutral text-primary-content p-2 text-white"
    >
      <h3 className="flex flex-row gap-2 border-b-2 border-white text-white justify-between pb-1 items-center">
        <div className="flex flex-row gap-2">
          <div className="avatar">
            <Link className="w-12 h-12" to={`profile/${createdByID}`}>
              <img className="rounded-xl" src={profileImage()} />
            </Link>
          </div>
          <div className="card-title ">
            {findAuthorName(createdByID, userQuery)}
          </div>
        </div>
        {postDropDownMenu}
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
          //postContent needs to be fed through the regex expression to check for hashtags
          //if hashtags exist, then they need to be converted into a clickable event for searching
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
