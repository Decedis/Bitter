import { useState } from "react";
import { useAuth } from "../Providers/FakeAuthProvider";
import { useUser } from "../services/queries";
import { User } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, KeyIcon } from "@heroicons/react/16/solid";
import toast from "react-hot-toast";

export const Login = () => {
  const [userForm, setUserForm] = useState<Omit<User, "id" | "profilePicture">>(
    {
      userName: "",
      password: "",
    }
  );
  const userQuery = useUser();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  //!userQuery.data ? console.log(userQuery.error) : console.log(userQuery.data);

  const userLogin = (
    userForm: { userName: string; password: string },
    allUserData?: User[]
  ) => {
    const foundUser = allUserData?.find(
      (u) =>
        u.userName === userForm.userName && u.password === userForm.password
    );
    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/");
      //This makes 2 errors and 1 success.
      toast.success("Logged in");
      return setUser(foundUser);
    } else {
      //This makes 3 error toasts. I'm not sure why.
      toast.error("Failed to login");
    }
  };

  return (
    <form
      className="border-2 border-color-slate-500 w-96 mx-auto flex flex-col items-center bg-slate-700 text-white p-4 mt-12 gap-4 rounded-md"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        userLogin(userForm, userQuery?.data);
        setUserForm({ userName: "", password: "" });
      }}
    >
      <h2 className="mb-8 border-b-2 border-white text-lg">Login</h2>
      <div className="flex flex-col flex-wrap w-11/12 h-28 items-center text-purple-200 gap-4 ">
        <label className="input input-bordered flex items-center gap-2">
          <UserIcon className="w-4 h-4 opacity-70" />
          <input
            type="text"
            className="grow"
            value={userForm.userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserForm({ ...userForm, userName: e.target.value })
            }
            placeholder="Username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <KeyIcon className="w-4 h-4 opacity-70" />
          <input
            type="password"
            className="grow"
            value={userForm.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserForm({ ...userForm, password: e.target.value })
            }
          />
        </label>
      </div>
      <div className="flex gap-4 items-center">
        <input className="btn border-2 border-white p-2" type="submit" />
        <Link
          className="text-purple-400 border-b-2 border-purple-200"
          to="/signup"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};
