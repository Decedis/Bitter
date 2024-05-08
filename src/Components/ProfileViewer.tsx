import { Outlet, useParams } from "react-router-dom";
import { useUser } from "../services/queries";

export const ProfileViewer = () => {
  //const user = useAuth().user;
  //postQuery
  //filter postQuery by user.id as defined by route
  //the route should be the API endpoint of currentUser when clicking the `profile` button
  //the route should be the API endpoint of selectedUser when clicking userName on select posts

  //if API endpoint === user.id, then allow image changes via url selection, given that the url must follow a given pattern

  const params = useParams<{ userId: string }>();
  const userQuery = useUser();

  const isParamUser = userQuery.data?.some((user) => user.id === params.userId);

  return (
    <div className="flex flex-col justify-center items-center min-h-24 ">
      {isParamUser ? <Outlet /> : <div>Hmmm...That can't be right</div>}
    </div>
  );
};
