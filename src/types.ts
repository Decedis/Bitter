export interface User {
  id: string | undefined;
  userName: string;
  password: string;
}

export type Comments = {
  id: number;
  userId: number;
  postId: number;
  content: string;
};

export type Tag = {
  id: number;
  postId: number;
  tagName: string;
};

export type ProtoPost = {
  id: string; //TODO return to Number in real database.
  createdByID: string;
  postContent: string;
  creationTime: Date;
};

export type Post = {
  id: string; //TODO return to Number in real database.
  //createdBy: string; //change to User down the line
  createdByID: string;
  postContent: string;
  creationTime: Date;
  tag: string;
  likes: number; //how often the point is liked
  comments: number;
};

export type Favorites = {
  id: number;
  userId: string;
  postId: string;
};
