import assert from "assert";
import { getContent } from "./utils";

const prepareInput = (data: string) => {
  const lines = data.split("\n").map((l) => l.trim());
  return lines;
};

const part1 = (data: any) => {
  return data;
};

const part2 = (data: any) => {
  return data;
};

const TEST = 1;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 0;
const RESULT_TWO = 0;

const input = getContent(FILENAME);
const data = prepareInput(input);
const result1 = part1(data);
const result2 = part2(data);

TEST && assert(result1 === RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert(result2 === RESULT_TWO, "RESULT 2 INCORRECT");

console.log("1:", result1);
console.log("2:", result2);
