import { useComments, useUser } from "../services/queries";
import { Comments } from "../types";
import { findAuthorName } from "../utils";

export const CommentsList = ({
  collapsed,
  commentsList,
  postID,
}: {
  collapsed: boolean;
  commentsList: Comments[];
  postID: string;
}) => {
  const userQuery = useUser();
  /*
  {
      "id": "0",
      "userId": 0,
      "postId": 14,
      "content": "The content of the comment"
    },
  */
  /*
    steps: 
    - check if commentsQuery.data is not empty
    - if not empty, iterate through commentsQuery.data and display each comment
    - filter, only render each comment that matches the postID
    - if collapsed is true, render the comments in a collapsible format
    - don't forget to use `collapse` and `expand` classes to style the collapsible format
 */
  return (
    <>
      {collapsed ? (
        <div className="bg-blue-500 collapse"></div>
      ) : (
        commentsList.map((commentVal: Comments) => (
          <div className="bg-blue-800 mb-4 p-2 rounded-md" key={commentVal.id}>
            <div>@{findAuthorName(commentVal.userId, userQuery)}</div>
            <div>{commentVal.content}</div>
          </div>
        ))
      )}
    </>
  );
};
