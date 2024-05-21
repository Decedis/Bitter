import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/FakeAuthProvider";
import { UserIcon } from "@heroicons/react/24/outline";
import { User } from "../types";

export const Nav = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({} as User);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-neutral text-neutral-content">
      <Link to={"/"}>
        <h1 className="border-b-2 border-r-2 border-slate-200 text-slate-200 text-center rounded-sm p-4 font-mono text-xl">
          Bitter
        </h1>
      </Link>
      <ul className="menu menu-horizontal px-1 w-full justify-end flex gap-8">
        <li>
          {user?.id ? (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link className="btn" to="/login">
              Login
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
                  className="rounded-xl"
                  alt="Tailwind CSS Navbar component"
                  src={user.profilePicture}
                />
              ) : (
                <UserIcon className="w-10 h-10" />
              )}
            </div>
          </div>
          {user?.id ? (
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 text-black"
            >
              <li>
                <Link className="justify-between" to={`/profile/${user?.id}`}>
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/bookmarks">Bookmarks</Link>
              </li>
            </ul>
          ) : null}
        </div>
      </ul>
      <Outlet />
    </nav>
  );
};
