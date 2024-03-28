import { useContext, useState } from "react";
import { useComments } from "../services/queries";
import { UserContext } from "../Providers/FakeAuthProvider";
import { useCreateComment } from "../services/mutations";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

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
      className="textarea textarea-secondary relative p-0 m-2 border-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateComment();
        setCommentDraft("");
      }}
    >
      <label htmlFor="createComment"></label>
      <input
        className="input input-bordered w-full h-20"
        type="text"
        name="createComment"
        id="createComment"
        autoComplete="off"
        value={commentDraft}
        onChange={(e) => {
          setCommentDraft(e.target.value);
        }}
      />
      <button
        className="btn btn-ghost absolute bottom-2 right-2"
        type="submit"
        disabled={isMutating || commentsQuery.isValidating || !user}
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  );
};
