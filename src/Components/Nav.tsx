import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../Providers/FakeAuthProvider";
import { useContext, useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

export const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const [buttonText, setButtonText] = useState<string>("Login");
  const navigate = useNavigate();

  useEffect(() => {
    user ? setButtonText("Logout") : setButtonText("Login");
  }, [user]);

  const handleLogout = () => {
    setUser({
      id: undefined,
      userName: "",
      password: "",
      profilePicture:
        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  console.log("nav img info: ", user?.profilePicture);

  return (
    <nav className="navbar bg-neutral text-neutral-content">
      <Link to={"/"}>
        <h1 className="border-b-2 border-r-2 border-slate-200 text-slate-200 text-center rounded-sm p-4 font-mono text-xl">
          Bitter
        </h1>
      </Link>
      <ul className="menu menu-horizontal px-1 w-full justify-end flex gap-8">
        <li>
          {user ? (
            <button className="btn" onClick={handleLogout}>
              {buttonText}
            </button>
          ) : (
            <Link className="btn" to="/login">
              {buttonText}
            </Link>
          )}
        </li>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-12 rounded-xl p-1">
              {user?.profilePicture ? (
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profilePicture}
                />
              ) : (
                <UserIcon className="w-10 h-10" />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 text-black"
          >
            <li>
              <Link className="justify-between" to={`/profile/${user?.id}`}>
                Profile
              </Link>
            </li>
            {/* <li>
              <a>Settings</a>
            </li> */}
            <li>
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
            {/* <li>
              <a>Logout</a>
            </li> */}
          </ul>
        </div>
      </ul>
      <Outlet />
    </nav>
  );
};
