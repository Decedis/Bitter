import { useContext, useState } from "react";
import { UserContext } from "../Providers/FakeAuthProvider";
import { usePosts } from "../services/queries";
import { useCreatePosts } from "../services/mutations";

export const CreatePost = () => {
  //post content
  //created by id
  const { user } = useContext(UserContext);
  const postsQuery = usePosts();
  const { trigger, isMutating } = useCreatePosts();
  const [postDraft, setPostDraft] = useState("");

  const currentTime = new Date(); //TODO: convert this to a universal time and keep only the primary numbers

  const handleCreatePost = async () => {
    // await axiosInstance.post("/posts", { postContent: postContent });
    // mutate();
    trigger(
      {
        postContent: postDraft,
        createdByID: user?.id,
        creationTime: currentTime,
      },
      {
        optimisticData: postsQuery.data && [
          ...postsQuery.data,
          { postContent: postDraft, createdByID: user?.id },
        ],
        rollbackOnError: true,
      }
    );
  };

  return (
    <form
      className="textarea textarea-secondary relative p-0 border-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreatePost();
        setPostDraft("");
      }}
    >
      <label htmlFor="createPost"></label>
      <input
        className="input input-bordered w-full h-40"
        type="text"
        name="createPost"
        id="createPost"
        value={postDraft}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPostDraft(e.target.value)
        }
      />
      <input
        className="btn btn-ghost absolute bottom-2 right-2"
        type="submit"
        disabled={isMutating || postsQuery.isValidating || !user}
      />
    </form>
  );
};
