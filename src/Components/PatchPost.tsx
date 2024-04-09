import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { usePatchPost } from "../services/mutations";
import { usePosts } from "../services/queries";

export const PatchPost = ({
  defaultValue,
  closePatch,
  id,
}: {
  defaultValue: string;
  closePatch: (input: boolean) => void;
  id: string;
}) => {
  const [patch, setPatch] = useState("");
  const postQuery = usePosts();
  const { trigger: patchPostTrigger } = usePatchPost();

  const handlePostPatch = async () => {
    patchPostTrigger(
      {
        id: id,
        postContent: patch,
      },
      {
        optimisticData: postQuery.data && [
          ...postQuery.data,
          { postContent: patch },
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
      key={id}
      onSubmit={(e) => {
        e.preventDefault();
        handlePostPatch();
        setPatch("");
        closePatch(false);
      }}
    >
      <label htmlFor="patchPost"></label>
      <input
        className="card w-full rounded-sm bg-neutral text-primary-content p-2 text-white z-10 h-full focus:outline-none"
        type="text"
        name="patchPost"
        id="patchPost"
        autoComplete="off"
        value={patch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPatch(e.target.value)
        }
      />
      <button className="btn btn-ghost absolute bottom-2 right-2" type="submit">
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  );
};
