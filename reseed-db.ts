import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";
//const capitalize = _.capitalize;
const range = _.range;
const sample = _.sample;

const postAmount = 20;
const tags = [
  "#engineering",
  "#poetry",
  "#teaching",
  "#finance",
  "#programming",
  "#writing",
  "#philosophy",
  "#cooking",
  "#humanities",
  "#STEM",
  "#astronomy",
  "#physics",
  "#mathematics",
  "#literature",
  "#plumbing",
  "#roofing",
];

const db = {
  posts: range(postAmount).map((_, id) => ({
    createdByID: sample([0, 1]),
    postContent: faker.word.words(sample([8, 5, 7])),
    id,
  })),
  tags: range(tags.length).map((_, id) => ({
    id,
    postId: range(tags.length),
    tagName: sample(tags),
  })),
  users: [
    {
      id: 0,
      userName: "test_1",
      password: "testPass1",
    },
    {
      id: 1,
      userName: "test_2",
      password: "testPass2",
    },
  ],
  //posts-to-tags or tags-to-posts
  comments: range(postAmount).map((_, id) => ({
    id,
    userId: sample([0, 1]),
    postId: sample(range(0, 19)),
    content: "The content of the comment",
  })),
  //comments-to-post: range(postAmount)
  favorites: range(postAmount).map((_, id) => ({
    id,
    userId: sample([0, 1]),
    postId: sample(range(0, 19)),
  })),
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
