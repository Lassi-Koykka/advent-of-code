import assert from "assert";
import { getContent } from "./utils";

const TEST = 0;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 288;
const RESULT_TWO = 71503;

const prepareInput = (data: string) => {
  const [times, goals] = data.split("\n").map(str => str.split(":  ")[1].replace(/ +/g, ' ').trim().split(" ").map(Number));
  return times.map((t, i) => [t, goals[i]])
};

const prepareInput2 = (data: string) => {
  return data.split("\n").map(str => Number(str.replace(/[^0-9]+/g, '')));
};

const part1 = (races: number[][]) => {
  const result = races.reduce((prev, [time, goal]) => {
    const possibleTimes = new Array(time - 1).fill(0).map((_, i) => i + 1);
    const sum = possibleTimes.reduce((sum, t) => {
      const distTraveled = t * (time - t);
      return distTraveled > goal ? sum + 1 : sum;
    }, 0)
    return prev * sum;
  }, 1)
  return result;
};


const part2 = (race: number[]) => {
  const [time, goal] = race
  console.log(race);
  return Math.floor(Math.sqrt(time ** 2 - 4 * goal)) + 1;
};

const input = getContent(FILENAME, true);
const data = prepareInput(input);
const data2 = prepareInput2(input)
const result1 = part1(data);
const result2 = part2(data2);

console.log("1:", result1);
console.log("2:", result2);
TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");
