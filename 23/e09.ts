import assert from "assert";

import { getContent } from "./utils";
const TEST = 0;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 114;
const RESULT_TWO = 2;

const prepareInput = (data: string) =>
  data.split("\n").map((l) => l.split(" ").map(Number));

const getDiffs = (arr: number[]) =>
  arr.reduce((prev, x, i) => {
    return i !== 0 ? [...prev, x - arr[i - 1]] : prev;
  }, [] as number[]);

const getHistories = (histories: number[][]): number[][] => {
  const cur = histories.at(-1);
  if (cur.every((x) => x === 0)) return histories;
  return getHistories([...histories, getDiffs(cur)]);
};

const part1 = (data: number[][]) => {
  return data.reduce((sum, d) => {
    const histories = getHistories([d]);
    const extrapolation = histories.reduceRight(
      (prev, h, i) =>
        i !== histories.length - 1 ? [...prev, h.at(-1) + prev.at(-1)] : prev,
      [0] as number[],
    );
    return sum + extrapolation.at(-1);
  }, 0);
};

const part2 = (data: number[][]) => {
  return data.reduce((sum, d) => {
    const histories = getHistories([d]).map((h) => h.reverse());
    const extrapolation = histories.reduceRight(
      (prev, h, i) =>
        i !== histories.length - 1 ? [...prev, h.at(-1) - prev.at(-1)] : prev,
      [0] as number[],
    );
    return sum + extrapolation.at(-1);
  }, 0);
};

const input = getContent(FILENAME);
const data = prepareInput(input);
const result1 = part1(data);
const result2 = part2(data);

TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");

console.log("1:", result1);
console.log("2:", result2);
