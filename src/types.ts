export interface User {
  id: string | undefined;
  userName: string;
  password: string;
}

export type Comments = {
  id: string; //TODO: the app is broken. Maybe return this back to number
  userId: string;
  postId: string;
  commentContent: string;
};

export type CommentFavorites = {
  id: string;
  userId: string;
  commentId: string;
};

export type Tag = {
  id: number;
  postId: string;
  tagName: string;
};

export type ProtoPost = {
  id: string; //TODO return to Number in real database.
  createdByID: string;
  postContent: string;
  creationTime: Date;
};

export type Post = {
  id: string;
  createdByID: string;
  postContent: string;
  creationTime: Date;
  tag: string;
  likes: number; //how often the point is liked
  comments: Comments[];
};

export type Favorites = {
  id: string;
  userId: string;
  postId: string;
};
