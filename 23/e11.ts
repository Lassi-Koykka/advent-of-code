import assert from "assert";
import { getContent } from "./utils";

const TEST = 1;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");

const prepareInput = (data: string) => {
  const lines = data.split("\n").map((l) => l.trim().split(""));
  return lines;
};

const data = prepareInput(getContent(FILENAME));

const printGrid = (g: string[][]) => {
  console.log(g.map((l) => l.join("")).join("\n"));
};

// IDEA: POSSIBLY A*?
// --- PART1 ---
const RESULT_ONE = 374;
const part1 = (data: string[][]) => {
  printGrid(data);
  return 0;
};

const result1 = part1(data);
TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
console.log("1:", result1);

// --- PART 2 ---
const RESULT_TWO = 0;
const part2 = (data: any) => {
  return data;
};

const result2 = part2(data);
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");
console.log("2:", result2);
