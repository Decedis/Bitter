import { useAuth } from "../Providers/FakeAuthProvider";

export const ProfileView = () => {
  const user = useAuth().user;
  //postQuery
  //filter postQuery by user.id as defined by route
  //the route should be the API endpoint of currentUser when clicking the `profile` button
  //the route should be the API endpoint of selectedUser when clicking userName on select posts

  //if API endpoint === user.id, then allow image changes via url selection, given that the url must follow a given pattern

  const userName = user ? user.userName : "";
  return (
    <div className="flex flex-col justify-center items-center min-h-18 max-w-28 border-sky-900 border-solid border-2 ">
      <h1>{userName} Profile</h1>
      <p>This is the profile view</p>
      <div>Under Construction</div>
    </div>
  );
};
