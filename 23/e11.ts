import assert from "assert";
import { getContent } from "./utils";

const TEST = 0;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");

const prepareInput = (data: string) => {
  const lines = data.split("\n").map((l) => l.trim().split(""));
  return lines;
};

const data = prepareInput(getContent(FILENAME));

const printGrid = (g: string[][]) => {
  console.log(g.map((l) => l.join("")).join("\n"));
};

// --- PART1 ---
const RESULT_ONE = 374;

const part1 = (grid: string[][]) => {
  const expandedHorizontally = grid.flatMap((line) => {
    if (line.join("").match("^[.]*$")) return [line, line];
    return [line];
  });
  const universe = expandedHorizontally.map((line) => {
    return line.flatMap((c, i) =>
      grid.every((l) => l[i] === ".") ? [c, c] : [c],
    );
  });

  const galaxies = universe.reduce((curr, line, y) => {
    return line.reduce((lineCurr, c, x) => {
      return c === "#" ? [...lineCurr, [x, y]] : lineCurr;
    }, curr);
  }, [] as number[][]);

  const shortestTotal = galaxies.reduce((currSum, [x1, y1], i) => {
    const galaxiesRest = galaxies.slice(i + 1);
    const sum = galaxiesRest.reduce((sum, [x2, y2]) => {
      return sum + Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }, 0);
    return currSum + sum;
  }, 0);
  return shortestTotal;
};

const result1 = part1(data);
TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
console.log("1:", result1);

// --- PART 2 ---
const RESULT_TWO = 8410;

// IDEA count amount of empty rows and columns in between points and multiply by 1_000_000
const part2 = (grid: string[][]) => {
  const multiplier = (TEST ? 100 : 1_000_000) - 1;
  const emptyRows = grid.reduce((prev, line, i) => {
    if (line.join("").match("^[.]*$")) return [...prev, i];
    return prev;
  }, [] as number[]);

  const emptyCols = grid[0].reduce((prev, c, i) => {
    return grid.every((l) => l[i] === ".") ? [...prev, i] : prev;
  }, [] as number[]);

  const galaxies = grid.reduce((curr, line, y) => {
    return line.reduce((lineCurr, c, x) => {
      return c === "#" ? [...lineCurr, [x, y]] : lineCurr;
    }, curr);
  }, [] as number[][]);

  const shortestTotal = galaxies.reduce((currSum, [x1, y1], i) => {
    const galaxiesRest = galaxies.slice(i + 1);
    const sum = galaxiesRest.reduce((sum, [x2, y2]) => {
      const emptyRowsInBetween = emptyRows.filter((r) => {
        return r < Math.max(y1, y2) && r > Math.min(y1, y2);
      }).length;
      const emptyColsInBetween = emptyCols.filter((c) => {
        return c < Math.max(x1, x2) && c > Math.min(x1, x2);
      }).length;
      return (
        sum +
        Math.abs(x1 - x2) +
        Math.abs(y1 - y2) +
        emptyRowsInBetween * multiplier +
        emptyColsInBetween * multiplier
      );
    }, 0);
    return currSum + sum;
  }, 0);
  return shortestTotal;

  return emptyRows;
};

const result2 = part2(data);
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");
console.log("2:", result2);
