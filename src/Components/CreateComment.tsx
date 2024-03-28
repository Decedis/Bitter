import { useContext, useState } from "react";
import { useComments } from "../services/queries";
import { UserContext } from "../Providers/FakeAuthProvider";
import { useCreateComment } from "../services/mutations";

export const CreateComment = (postId: { postId: string }) => {
  const commentsQuery = useComments();
  const { user } = useContext(UserContext);
  const { trigger, isMutating } = useCreateComment();
  const [commentDraft, setCommentDraft] = useState("");

  const handleCreateComment = async () => {
    trigger(
      {
        commentContent: commentDraft,
        userId: user?.id,
        postId: postId.postId,
      },
      {
        optimisticData: commentsQuery.data && [
          ...commentsQuery.data,
          { commentContent: commentDraft, createdByID: user?.id },
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
        handleCreateComment();
        setCommentDraft("");
      }}
    >
      <label htmlFor="createComment"></label>
      <input
        className="input input-bordered w-full h-40"
        type="text"
        name="createComment"
        id="createComment"
        value={commentDraft}
        onChange={(e) => {
          setCommentDraft(e.target.value);
        }}
      />
      <input
        className="btn btn-ghost absolute bottom-2 right-2"
        type="submit"
        disabled={isMutating || commentsQuery.isValidating || !user}
      />
    </form>
  );
};
