import assert from "assert";
import { getContent } from "./utils";

const TEST = 1;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 0;
const RESULT_TWO = 0;

const prepareInput = (data: string) => {
  const hands = data
    .split("\n")
    .map((l) => l.split(" ").map((str, i) => (i === 1 ? Number(str) : str)));
  return hands;
};

const rankHand = (str: string) => {
  const cardCounts = [...str].reduce((curCounts) => {}), {} as { [key: string]: number });
};

const part1 = (data: any) => {
  return data;
};

const part2 = (data: any) => {
  return data;
};

const input = getContent(FILENAME);
const data = prepareInput(input);
const result1 = part1(data);
const result2 = part2(data);

console.log("1:", result1);
console.log("2:", result2);

TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");
