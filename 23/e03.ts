import { getContent, isNumeric } from "./utils";

const TEST = 1;
const DAY = __filename.split(".")[0];
const CREATE_FILES = 0;

const filename = DAY + (TEST ? "-test.txt" : "-input.txt");
const input = getContent(filename, !!CREATE_FILES);

type Dictionary<T> = { [key: string]: T };

const areAdjacent = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) < 2 && Math.abs(y1 - y2) < 2;

const part1 = (lines: string[]) => {
  const symbols = lines.reduce((prevSymbols, line, y) => {
    return [...line].reduce((prev, c, x) => {
      return !isNumeric(c) && c !== "." ? [...prev, `${x}-${y}`] : prev;
    }, prevSymbols);
  }, [] as string[]);

  const sum = lines.reduce((prevSum, line, y) => {
    const { lineSum } = [...line].reduce(
      (prev, c, x) => {
        if (!isNumeric(c)) {
          return prev;
        }

        const { adjacent, numStart, lineSum } = prev;
        const isAdjacent =
          adjacent ||
          symbols.some((sym) => {
            const [symX, symY] = sym.split("-").map(Number);
            return areAdjacent(x, y, symX, symY);
          });

        const curNumStart = numStart > -1 ? numStart : x;

        if (x < line.length - 1 && isNumeric(line[x + 1])) {
          return { ...prev, adjacent: isAdjacent, numStart: curNumStart };
        }

        if (!isAdjacent) {
          return { adjacent: false, numStart: -1, lineSum: lineSum };
        }

        const num = Number(line.slice(curNumStart, x + 1));
        return { adjacent: false, numStart: -1, lineSum: lineSum + num };
      },
      { adjacent: false, numStart: -1, lineSum: 0 }
    );
    return prevSum + lineSum;
  }, 0);
  return sum;
};

const part2 = (lines: string[]) => {
  const gears = lines.reduce((prevSymbols, line, y) => {
    return [...line].reduce((prev, c, x) => {
      return !isNumeric(c) && c == "*" ? { ...prev, [`${x}-${y}`]: [] } : prev;
    }, prevSymbols);
  }, {} as Dictionary<number[]>);

  const newGears = lines.reduce((prevGears, line, y) => {
    const { lineGears: lineGearParts } = [...line].reduce(
      (prev, c, x) => {
        const { adjGears, numStart, lineGears } = prev;

        if (!isNumeric(c)) {
          return prev;
        }

        const newAdjGears = Object.keys(gears).reduce((prev, sym) => {
          const [symX, symY] = sym.split("-").map(Number);
          return areAdjacent(x, y, symX, symY) && !prev.includes(sym)
            ? [...prev, sym]
            : prev;
        }, adjGears);

        const curNumStart = numStart > -1 ? numStart : x;

        if (x < line.length - 1 && isNumeric(line[x + 1])) {
          return { ...prev, adjGears: newAdjGears, numStart: curNumStart };
        }

        const isAdjacent = adjGears.length || newAdjGears.length;
        if (!isAdjacent) {
          return { adjGears: [], numStart: -1, lineGears: lineGears };
        }

        const num = Number(line.slice(curNumStart, x + 1));
        const newLineGearParts = newAdjGears.reduce((prev, g) => {
          return { ...prev, [g]: [...prev[g], num] };
        }, lineGears);

        return { adjGears: [], numStart: -1, lineGears: newLineGearParts };
      },
      { adjGears: [] as string[], numStart: -1, lineGears: prevGears }
    );
    return lineGearParts;
  }, gears);

  const validGears = Object.values(newGears).filter((g) => g.length == 2);
  return validGears.reduce((prev, [a, b]) => prev + a * b, 0);
};

const lines = input.split("\n");

console.log();
console.log("1:", part1(lines));
console.log("2:", part2(lines));
