import { PostCard } from "./PostCard";
import { Comments, Favorites, Post } from "../types";
import { useComments, useFavorites, usePosts } from "../services/queries";
import { CreatePost } from "./CreatePost";

export const Feed = () => {
  const postsQuery = usePosts();

  const favQuery = useFavorites();
  const commentsQuery = useComments();

  const sortedPosts = postsQuery.data?.sort((a, b) => {
    const dateA = new Date(a.creationTime);
    const dateB = new Date(b.creationTime);
    return dateB.getTime() - dateA.getTime();
  });

  const cardLikes = (localId: string, favQuery: Favorites[]) => {
    const newArr = (favQuery ?? []).filter((fav) => {
      return fav.postId === localId;
    });
    return newArr;
  };

  const postComments = (id: string) => {
    return commentsQuery?.data
      ? commentsQuery.data.filter(
          (comments: Comments) => comments.postId === id
        )
      : ([] as Comments[]);
  };

  return (
    <section className="mt-10 p-4 w-fit mx-auto flex flex-col">
      <CreatePost />
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
    </section>
  );
};
