import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";
const capitalize = _.capitalize;
const range = _.range;
const sample = _.sample;

const pointAmount = 20;
const categories = [
  "engineer",
  "professor",
  "mentor",
  "banker",
  "web developer",
  "writer",
  "philosopher",
  "cook",
  "humanities",
  "STEM",
  "astronomy",
  "physics",
  "mathematics",
  "literature",
  "plumbing",
  "roofing",
];
const tags = ["newbie", "help", "tutorial", "advanced", "self", "intermediate"];
const db = {
  points: range(pointAmount).map((_, id) => ({
    URL: "",
    title: `${capitalize(faker.word.words())} ${capitalize(
      faker.word.words()
    )}`,
    description: faker.word.words(sample([8, 5, 7])),
    poster: `${capitalize(faker.person.firstName())}`,
    category: sample(categories),
    tag: sample(tags),
    value: sample(1, 100),
    public: sample([true, false]),
    id,
  })),
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
