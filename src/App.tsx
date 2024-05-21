import "./App.css";
import { DataProvider } from "./Providers/BackendProvider";
import { Nav } from "./Components/Nav";
import { FakeAuthProvider } from "./Providers/FakeAuthProvider";
import { Routes, Route } from "react-router-dom";
import { Bookmarks } from "./Components/Bookmarks";
import { Feed } from "./Components/Feed";
import { Login } from "./Components/Login";
import { ProfileViewer } from "./Components/ProfileViewer";
import { User } from "./Components/User";
import { Signup } from "./Components/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <FakeAuthProvider>
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" errorElement={<div>Oops, page not found</div>}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<ProfileViewer />}>
              <Route path=":userId" element={<User />} />
            </Route>
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Routes>
        <Toaster />
      </DataProvider>
    </FakeAuthProvider>
  );
}

export default App;
