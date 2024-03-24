import { useCallback, useContext } from "react";
import { AllPostsContext } from "./Providers/BackendProvider";
import { Requests } from "./postAPI";

export const useServerActions = () => {
  const { setAllPosts } = useContext(AllPostsContext);

  const refetch = useCallback(() => {
    Requests.getAllPosts()
      .then(setAllPosts)
      .finally(() => {
        console.log("Action finished");
      });
  }, [setAllPosts]);

  return { refetch };
};
