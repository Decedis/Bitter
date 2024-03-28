import { Comments } from "../types";
import { CommentCard } from "./CommentCard";
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
  const renderComments = () => {
    if (collapsed) {
      return <></>;
    } else if (!collapsed && commentsList.length === 0) {
      return <CreateComment postId={postId} />;
    } else if (!collapsed && commentsList.length > 0) {
      return (
        <>
          {commentsList.map((commentVal: Comments) => (
            <CommentCard
              key={commentVal.id}
              id={commentVal.id}
              userId={commentVal.userId}
              postId={commentVal.postId}
              commentContent={commentVal.commentContent}
            />
          ))}
          <CreateComment postId={postId} />
        </>
      );
    }
  };

  return <>{renderComments()}</>;
};
