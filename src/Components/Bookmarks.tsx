import { useAuth } from "../Providers/FakeAuthProvider";
import {
  useBookmarks,
  useComments,
  useFavorites,
  usePosts,
} from "../services/queries";
import { Favorites, Post } from "../types";
import { cardLikes, postComments } from "../utils";
import { PostCard } from "./PostCard";

export const Bookmarks = () => {
  const user = useAuth();
  const postQuery = usePosts();
  const favQuery = useFavorites();
  const bookmarkQuery = useBookmarks();
  const commentsQuery = useComments();

  const userBookmarks = user.user
    ? postQuery.data?.filter((post) => {
        const arr: Post[] = [];
        bookmarkQuery.data?.filter((bookmark) => {
          if (
            bookmark.userId === user.user?.id &&
            bookmark.postId === post.id
          ) {
            arr.push(post);
          }
        });
        return arr.length > 0;
      })
    : [];

  // const userBookmarks = user.user
  //   ? postQuery.data?.filter((post) => {
  //       const arr: Post[] = [];
  //       bookmarkQuery.data?.filter((bookmark) => {
  //         if (
  //           bookmark.userId === user.user?.id &&
  //           bookmark.postId === post.id
  //         ) {
  //           arr.push(post);
  //         }
  //       });
  //       return arr.length > 0;
  //     })
  //   : [];

  //console.log("postQuery: ", postQuery.data);
  console.log("user: ", user.user);
  console.log("bookmarkQuery: ", bookmarkQuery.data);
  console.log("userBookmarks: ", userBookmarks);

  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-18">
      <h1 className="mt-6">Bookmarks</h1>
      {userBookmarks && userBookmarks.length > 0 ? (
        userBookmarks?.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            createdByID={post.createdByID}
            creationTime={post.creationTime}
            tag={post.tag}
            postContent={post.postContent}
            likes={cardLikes(post.id, favQuery.data as Favorites[]).length}
            comments={postComments(post.id, commentsQuery)}
          />
        ))
      ) : (
        <h2>No available bookmarks</h2>
      )}
    </div>
  );
};
