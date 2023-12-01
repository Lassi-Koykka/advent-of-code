import { getContent, isNumeric } from "./utils";

const TEST_INPUT_2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const NUMS = [
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

const CREATE_FILES = false;
const DAY = __filename.split(".")[0];
const TEST = false;

const input = getContent(
  TEST ? DAY + "-test.txt" : DAY + "-input.txt",
  CREATE_FILES,
);

const lines = input.trim().split("\n");

const parseLineNumbers = (l: string, parseNumberStrings: boolean = false) =>
  [...l].reduce((prev, c, idx) => {
    if (isNumeric(c)) return [...prev, Number(c)];
    if (!parseNumberStrings) return prev;
    const strNum = NUMS.findIndex((num) => l.slice(idx).startsWith(num));
    if (strNum > -1) return [...prev, strNum + 1];
    return prev;
  }, [] as string[]);

const parseLines = (lines: string[], parseNumberStrings: boolean = false) =>
  lines.map((l) => {
    const numbersOnLine = parseLineNumbers(l, parseNumberStrings);
    return Number(
      `${numbersOnLine[0]}${numbersOnLine[numbersOnLine.length - 1]}`,
    );
  });

const part_1 = (lines: string[]) =>
  parseLines(lines).reduce((prev, cur) => prev + cur, 0);
const part_2 = (lines: string[]) =>
  parseLines(lines, true).reduce((prev, cur) => prev + cur, 0);

console.log();
console.log("1:", part_1(lines));
console.log("2:", part_2(TEST ? TEST_INPUT_2.split("\n") : lines));
