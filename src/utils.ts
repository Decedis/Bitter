import { SWRResponse } from "swr";
import { User } from "./types";

export const findAuthorName = (
  createdByID: string,
  userQuery: SWRResponse<User[]>
) => {
  const authorName = userQuery.data?.find((user) => user.id === createdByID);
  return authorName?.userName;
};
