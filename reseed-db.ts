import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";
//const capitalize = _.capitalize;
const range = _.range;
const sample = _.sample;

const postAmount = 20;

const db = {
  posts: range(postAmount).map((_, id) => ({
    createdByID: sample([0, 1]),
    postContent: faker.word.words(sample([8, 5, 7])),
    id,
  })),
  users: [
    {
      id: "0",
      userName: "test_1",
      password: "testPass1",
      profilePicture:
        "https://blog.bear.app/wp-content/uploads/2018/10/bear-icon.png",
    },
    {
      id: "1",
      userName: "test_2",
      password: "testPass2",
      profilePicture:
        "https://images.unsplash.com/photo-1713872288272-afa3f0d001c2?q=80&w=3091&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  //posts-to-tags or tags-to-posts
  comments: range(postAmount).map((_, id) => ({
    id,
    userId: sample([0, 1]),
    postId: sample(range(0, 19)),
    commentContent: "The content of the comment",
  })),
  //comments-to-post: range(postAmount)
  favorites: range(postAmount).map((_, id) => ({
    id,
    userId: sample([0, 1]),
    postId: sample(range(0, 19)),
  })),
  commentFavorites: [],
  bookmarks: [],
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
