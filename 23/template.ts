import { getContent } from "./utils";

const TEST = 1;
const CREATE_FILES = 0;
const filename = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");

const input = getContent(filename);

const run = (data: string) => {
  return data;
};

console.log();
console.log("1:", run(input));
console.log("2:", run(input));
