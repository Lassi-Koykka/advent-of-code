import { getContent } from "./utils";

const CREATE_FILES = false;
const DAY = __filename.split(".")[0];
const TEST = false;

const TEST_INPUT_2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const NUMBERS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const input = getContent(
  TEST ? DAY + "-test.txt" : DAY + "-input.txt",
  CREATE_FILES,
);

const isNumeric = (c: string) => {
  return !isNaN(parseInt(c, 10));
};

const part_1 = (data: string) => {
  const lines = data.split("\n");
  const result = lines
    .map((l) => {
      const chars = [...l];
      const first = chars.find((c) => isNumeric(c));
      const last = [...chars].reverse().find((c) => isNumeric(c));
      const num = Number(`${first}${last}`);
      return num;
    })
    .reduce((prev, cur) => prev + cur, 0);
  return result;
};

const part_2 = (data: string) => {
  const lines = data.split("\n");
  const result = lines
    .map((l) => {
      const numbersOnLine = [...l].reduce((prev, c, idx) => {
        if (isNumeric(c)) return [...prev, Number(c)];
        const strNum = NUMBERS.findIndex(
          (num) => l.slice(idx, idx + num.length) === num,
        );
        if (strNum > -1) {
          return [...prev, strNum + 1];
        }
        return prev;
      }, [] as string[]);
      return Number(
        `${numbersOnLine[0]}${numbersOnLine[numbersOnLine.length - 1]}`,
      );
    })
    .reduce((prev, num) => prev + num, 0);
  return result;
};

console.log();
console.log("1:", part_1(input));
console.log("2:", part_2(TEST ? TEST_INPUT_2 : input));
