export interface User {
  id: number;
  name: string;
  age: number;
  profession: Profession;
  createdPoints: Point[];
  savedPoints: Point[];
  comments: Comment;
}

export type Profession = {
  professions: string[]; //TODO value needs to be propagated
};

export type Category = {
  categories: string[]; //TODO value needs to be propagated
};

export type Comment = {
  id: number;
  parentID: number;
  comment: string;
};

export type Point = {
  id: number;
  URL: string;
  title: string;
  description: string;
  poster: string;
  category: string; //TODO make this value of type Category
  tag: string;
  value: number; //how often the point is liked
  public: boolean;
};
