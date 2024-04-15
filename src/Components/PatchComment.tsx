import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { usePatchComment } from "../services/mutations";
import { useComments } from "../services/queries";

export const PatchComment = ({
  defaultValue,
  closePatch,
  id,
}: {
  defaultValue: string;
  closePatch: (input: boolean) => void;
  id: string;
}) => {
  const [patch, setPatch] = useState("");
  const commentQuery = useComments();
  const { trigger: patchCommentTrigger } = usePatchComment();

  const handleCommentPatch = async () => {
    patchCommentTrigger(
      {
        id: id,
        commentContent: patch,
      },
      {
        optimisticData: commentQuery.data && [
          ...commentQuery.data,
          { commentContent: patch },
        ],
        rollbackOnError: true,
      }
    );
  };

  useEffect(() => {
    setPatch(defaultValue);
  }, [defaultValue]);

  return (
    <form
      className="m-w-full min-h-full min-w-full"
      key={id}
      onSubmit={(e) => {
        e.preventDefault();
        handleCommentPatch();
        setPatch("");
        closePatch(false);
      }}
    >
      <label htmlFor="patchComment"></label>
      <input
        className="flex bg-blue-500 rounded-md m-1 mt-4 p-1 justify-end h-full w-full"
        type="text"
        name="patchComment"
        id="patchComment"
        value={patch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPatch(e.target.value);
        }}
      />
      <button className="btn btn-ghost relative left-72 " type="submit">
        <PaperAirplaneIcon className="w-12 h-12 text-gray-500" />
      </button>
    </form>
  );
};
