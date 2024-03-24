import { UserIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../Providers/FakeAuthProvider";
import { useContext } from "react";

export const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="border-2 border-black rounded-md w-60 h-auto ml-4 p-2 flex flex-col items-start gap-2">
      <div className="border-2 rounded-full border-black p-2 mx-auto mb-3">
        <UserIcon className="h-10 w-10 " />
      </div>
      <h2>Name: {user?.userName}</h2>

      <h3>Bio:</h3>
      <div className="border-t-2 border-black w-full flex place-content-between">
        <div className="created">Created: 0</div>
        <div className="comments">Comments: 0</div>
      </div>
    </div>
  );
};
