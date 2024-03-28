import { useUser } from "../services/queries";
import { Comments } from "../types";
import { findAuthorName } from "../utils";
import { CreateComment } from "./CreateComment";

export const CommentsList = ({
  collapsed,
  commentsList,
  postId,
}: {
  collapsed: boolean;
  commentsList: Comments[];
  postId: string;
}) => {
  const userQuery = useUser();

  const renderComments = () => {
    if (collapsed) {
      return <></>;
    } else if (!collapsed && commentsList.length === 0) {
      return <CreateComment postId={postId} />;
    } else if (!collapsed && commentsList.length > 0) {
      return (
        <>
          {commentsList.map((commentVal: Comments) => (
            <div
              className="bg-blue-800 mb-4 p-2 rounded-md"
              key={commentVal.id}
            >
              <div>@{findAuthorName(commentVal.userId, userQuery)}</div>
              <div>{commentVal.commentContent}</div>
            </div>
          ))}
          <CreateComment postId={postId} />
        </>
      );
    }
  };

  return <>{renderComments()}</>;
};
