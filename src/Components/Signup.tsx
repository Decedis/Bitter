import { useState } from "react";
import { User } from "../types";
import { useCreateUser } from "../services/mutations";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/queries";
import { KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import toast from "react-hot-toast";

export const Signup = () => {
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    userName: "",
    password: "",
    profilePicture: "",
  });
  const userQuery = useUser();
  const navigate = useNavigate();
  const { trigger: triggerCreateUser } = useCreateUser();

  const handleAccountCreation = () => {
    triggerCreateUser(
      {
        userName: newUser.userName,
        password: newUser.password,
        profilePicture: "",
      },
      {
        optimisticData: userQuery.data && [
          ...userQuery.data,
          {
            userName: newUser.userName,
            password: newUser.password,
            profilePicture: "",
          },
        ],
        rollbackOnError: true,
      }
    );
  };
  //TODO ensure username follows convention
  //TODO give success when user is created, and fail when user is not created.
  return (
    <form
      className="border-2 border-color-slate-500 w-96 mx-auto flex flex-col items-center bg-slate-700 text-white p-4 mt-12 gap-4 rounded-md"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleAccountCreation();
        navigate("/login");
        toast.success("User created");
        setNewUser({ userName: "", password: "", profilePicture: "" });
      }}
    >
      <h2 className="mb-8 border-b-2 border-white text-lg">Sign up</h2>
      <div className="flex flex-col flex-wrap w-11/12 h-28 items-center text-purple-700 gap-4 ">
        <label className="input input-bordered flex items-center gap-2">
          <UserIcon className="w-4 h-4 opacity-70" />
          <input
            type="text"
            className="grow"
            value={newUser.userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, userName: e.target.value })
            }
            placeholder="Username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <KeyIcon className="w-4 h-4 opacity-70" />
          <input
            type="password"
            className="grow"
            value={newUser.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </label>
      </div>
      <div className="flex gap-4 items-center">
        {/* <input className="btn border-2 border-white p-2" type="submit" /> */}
        <button className="btn border-2 border-white p-2" type="submit">
          Sign up
        </button>
      </div>
    </form>
  );
};
