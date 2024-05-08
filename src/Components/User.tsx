import { useParams } from "react-router-dom";
import {
  useComments,
  useFavorites,
  usePosts,
  useUser,
} from "../services/queries";
import { useAuth } from "../Providers/FakeAuthProvider";
import { Post, Favorites, Comments } from "../types";
import { cardLikes } from "../utils";
import { PostCard } from "./PostCard";
import { ProfileInfoCard } from "./ProfileInfoCard";

export const User = () => {
  const param = useParams<{ userId: string }>();
  //const user = useAuth(); //need this to set whether or not image and username is editable.
  const postsQuery = usePosts();
  const commentsQuery = useComments();
  const favQuery = useFavorites();
  const userQuery = useUser();

  const derivedUserInformation = userQuery.data?.find(
    (user) => user.id === param.userId
  );

  const derivedPosts = postsQuery.data?.filter(
    (post) => post.createdByID === param.userId
  );

  const sortedPosts = derivedPosts?.sort((a, b) => {
    const dateA = new Date(a.creationTime);
    const dateB = new Date(b.creationTime);
    return dateB.getTime() - dateA.getTime();
  });

  const postComments = (id: string) => {
    return commentsQuery?.data
      ? commentsQuery.data.filter(
          (comments: Comments) => comments.postId === id
        )
      : ([] as Comments[]);
  };

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
              tag={post.tag}
              postContent={post.postContent}
              likes={cardLikes(post.id, favQuery.data as Favorites[]).length}
              comments={postComments(post.id)}
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
