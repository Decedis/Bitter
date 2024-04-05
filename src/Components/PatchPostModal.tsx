import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export const PatchPostModal = ({ defaultValue }: { defaultValue: string }) => {
  const [patch, setPatch] = useState("");

  useEffect(() => {
    setPatch(defaultValue);
  }, [defaultValue]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPatch("");
      }}
    >
      <label htmlFor="patchPost"></label>
      <input
        className="card w-96 rounded-sm bg-neutral text-primary-content p-2 text-white z-10 h-full"
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
