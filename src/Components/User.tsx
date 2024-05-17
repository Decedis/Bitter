import { useParams } from "react-router-dom";
import {
  useComments,
  useFavorites,
  usePosts,
  useUser,
} from "../services/queries";
import { Post, Favorites } from "../types";
import { cardLikes, postComments } from "../utils";
import { PostCard } from "./PostCard";
import { ProfileInfoCard } from "./ProfileInfoCard";

export const User = () => {
  const param = useParams<{ userId: string }>();
  const postsQuery = usePosts();
  const commentsQuery = useComments();
  const favQuery = useFavorites();
  const userQuery = useUser();

  //TODO derivedUserInformation and derivedPosts use the same pattern. Could I make them into a single function?
  const derivedUserInformation = userQuery.data?.find(
    (user) => user.id === param.userId
  );

  const derivedPosts = postsQuery.data?.filter(
    (post) => post.createdByID === param.userId
  );

  //TODO try updating this method
  const sortedPosts = derivedPosts?.sort((a, b) => {
    const dateA = new Date(a.creationTime);
    const dateB = new Date(b.creationTime);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="flex flex-col">
      <ProfileInfoCard
        userName={derivedUserInformation?.userName || "unavailable"}
        id={derivedUserInformation?.id}
        profilePicture={
          derivedUserInformation?.profilePicture ||
          "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        }
      />
      <div className="flex flex-col flex-wrap gap-2  mx-auto justify-center">
        {favQuery && postsQuery ? (
          sortedPosts?.map((post: Post) => (
            <PostCard
              key={post.id}
              id={post.id}
              createdByID={post.createdByID}
              creationTime={post.creationTime}
              postContent={post.postContent}
              likes={cardLikes(post.id, favQuery.data as Favorites[]).length}
              comments={postComments(post.id, commentsQuery)}
            />
          ))
        ) : (
          <>
            <h2>Loading...</h2>
          </>
        )}
      </div>
    </div>
  );
};
