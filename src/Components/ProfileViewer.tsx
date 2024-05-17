import { Outlet, useParams } from "react-router-dom";
import { useUser } from "../services/queries";

export const ProfileViewer = () => {
  const params = useParams<{ userId: string }>();
  const userQuery = useUser();

  const isParamUser = userQuery.data?.some((user) => user.id === params.userId);

  return (
    <div className="flex flex-col justify-center items-center min-h-24 ">
      {isParamUser ? <Outlet /> : <div>Hmmm...That can't be right</div>}
    </div>
  );
};
