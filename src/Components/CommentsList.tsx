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
  return (
    <>
      {!collapsed && commentsList ? (
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
      ) : null}
    </>
  );
};
