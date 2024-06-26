import { useState } from "react";
import { useComments } from "../services/queries";
import { useRequiredUser } from "../Providers/FakeAuthProvider";
import { useCreateComment } from "../services/mutations";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

export const CreateComment = (postId: { postId: string }) => {
  const commentsQuery = useComments();
  const user = useRequiredUser();
  const { trigger, isMutating } = useCreateComment();
  const [commentDraft, setCommentDraft] = useState("");

  const handleCreateComment = async () => {
    user.id
      ? trigger(
          {
            commentContent: commentDraft,
            userId: user.id,
            postId: postId.postId,
          },
          {
            optimisticData: commentsQuery.data && [
              ...commentsQuery.data,
              { commentContent: commentDraft, createdByID: user.id },
            ],
            rollbackOnError: true,
          }
        )
      : null;
  };

  return (
    <form
      className="textarea textarea-secondary relative p-0 m-2 border-2 text-black-900"
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCommentDraft(e.target.value);
        }}
      />
      <button
        className="btn btn-ghost absolute bottom-2 right-2"
        type="submit"
        disabled={isMutating || commentsQuery.isValidating || !user.id}
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  );
};
