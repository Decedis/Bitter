import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";

type TAuth = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
};

const defaultAuthValue: TAuth = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<TAuth>(defaultAuthValue);

export const FakeAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  //TODO if localStorage "user" exists, set 'user' to localStorage val.

  useEffect(() => {
    if (!user && localStorage.getItem("user")) {
      const userObj = localStorage.getItem("user");
      userObj ? setUser(JSON.parse(userObj)) : null;
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//hook declarations
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error(
      "Please use `useAuth` hook within the scope of an AuthProvider"
    );
  return context;
};

export const useRequiredUser = () => {
  const { user } = useAuth();
  if (!user) throw new Error("Shit");
  return user;
};
