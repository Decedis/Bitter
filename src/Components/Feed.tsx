import { PostCard } from "./PostCard";
import { Favorites, Post } from "../types";
import { useComments, useFavorites, usePosts } from "../services/queries";
import { CreatePost } from "./CreatePost";
import { cardLikes, postComments } from "../utils";

export const Feed = () => {
  const postsQuery = usePosts();
  const favQuery = useFavorites();
  const commentsQuery = useComments();

  const sortedPosts = postsQuery.data?.sort((a, b) => {
    const dateA = new Date(a.creationTime);
    const dateB = new Date(b.creationTime);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="mt-10 p-4 w-fit mx-auto flex flex-col">
      <CreatePost />
      <div className="flex flex-col flex-wrap gap-2  mx-auto justify-center">
        {favQuery && postsQuery ? (
          sortedPosts?.map((post: Post, index: number) => (
            <PostCard
              key={index}
              id={post.id}
              createdByID={post.createdByID}
              creationTime={post.creationTime}
              postContent={post.postContent}
              likes={cardLikes(post.id, favQuery.data as Favorites[]).length}
              comments={postComments(post.id, commentsQuery)}
            />
          ))
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </section>
  );
};
