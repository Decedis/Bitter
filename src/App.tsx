import "./App.css";
import { PostsProvider } from "./Providers/BackendProvider";
import { Feed } from "./Components/Feed";
import { Nav } from "./Components/Nav";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { FakeAuthProvider } from "./Providers/FakeAuthProvider";
import { ProfileView } from "./Components/ProfileView";
import { Bookmarks } from "./Components/Bookmarks";

function App() {
  return (
    <FakeAuthProvider>
      <PostsProvider>
        <Nav />

        <Routes>
          <Route path="/">
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Routes>
      </PostsProvider>
    </FakeAuthProvider>
  );
}

export default App;
