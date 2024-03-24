import { useComments } from "../services/queries";
import { Comments } from "../types";

export const CommentsList = ({
  collapsed,
  postID,
}: {
  collapsed: boolean;
  postID: string;
}) => {
  const commentsQuery = useComments();

  const postComments = commentsQuery.data?.filter(
    (comments: Comments) => comments.postId === postID
  );
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
    
 */
  return (
    <>
      {collapsed ? (
        <div className="collapse bg-base-200 block mt-4" key={postID}>
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-content">
            <div>@</div>
            <div>Content</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
