import { useContext, useState } from "react";
import { useComments } from "../services/queries";
import { UserContext } from "../Providers/FakeAuthProvider";

export const CreateComment = () => {
  const commentsQuery = useComments();
  const { user } = useContext(UserContext);
  const [commentDraft, setCommentDraft] = useState("");
  return (
    <form
      className="textarea textarea-secondary relative p-0 border-2"
      onSubmit={(e) => {
        e.preventDefault();
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
        disabled={commentsQuery.isValidating || !user}
      />
    </form>
  );
};
