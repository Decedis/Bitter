import { useState } from "react";
import { User } from "../types";
import { useCreateUser } from "../services/mutations";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/queries";

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
  //TODO need to check for duplicates of usernames? Maybe?
  return (
    <form
      className="border-2 border-color-slate-500 w-96 mx-auto flex flex-col items-center bg-slate-700 text-white p-4 mt-12 gap-4 rounded-md"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleAccountCreation();
        navigate("/");
        setNewUser({ userName: "", password: "", profilePicture: "" });
      }}
    >
      <h2 className="mb-8 border-b-2 border-white text-lg">Sign up</h2>
      <div className="flex flex-col flex-wrap w-11/12 h-28 items-center text-purple-700 gap-4 ">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
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
        <input className="btn border-2 border-white p-2" type="submit" />
      </div>
    </form>
  );
};