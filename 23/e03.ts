import { getContent, isNumeric } from "./utils";

const TEST = 1;
const DAY = __filename.split(".")[0];
const CREATE_FILES = 0;

const input = getContent(
  `${DAY}${TEST ? "-test.txt" : "-input.txt"}`,
  !!CREATE_FILES
);

type Dictionary<T> = { [key: string]: T };

const part1 = (data: string) => {
  const lines = data.split("\n");

  const symbols = lines.reduce((prevSymbols, line, y) => {
    const newSymbols = [...line].reduce((prev, c, x) => {
      return !isNumeric(c) && c !== "." ? { ...prev, [`${x}-${y}`]: c } : prev;
    }, {} as Dictionary<string>);
    return { ...prevSymbols, ...newSymbols };
  }, {} as Dictionary<string>);

  const sum = lines.reduce((prevSum, line, y) => {
    const { lineSum } = [...line].reduce(
      (prev, c, x) => {
        const { adjacent, numStart, lineSum } = prev;
        if (isNumeric(c)) {
          const isAdjacent =
            adjacent ||
            Object.keys(symbols).some((sym) => {
              const [symX, symY] = sym.split("-").map(Number);
              const deltaX = Math.abs(symX - x);
              const deltaY = Math.abs(symY - y);
              return deltaX < 2 && deltaY < 2;
            });
          const curNumStart = numStart > -1 ? numStart : x;
          if (x >= line.length - 1 || !isNumeric(line[x + 1])) {
            if (!isAdjacent) {
              return { adjacent: false, numStart: -1, lineSum: lineSum };
            }
            const numStr = line.slice(curNumStart, x + 1);
            return {
              adjacent: false,
              numStart: -1,
              lineSum: lineSum + Number(numStr),
            };
          }
          return { ...prev, adjacent: isAdjacent, numStart: curNumStart };
        }
        return prev;
      },
      { adjacent: false, numStart: -1, lineSum: 0 }
    );
    return prevSum + lineSum;
  }, 0);
  return sum;
};

const part2 = (data: string) => {
  const lines = data.split("\n");

  const gears = lines.reduce((prevSymbols, line, y) => {
    const newSymbols = [...line].reduce((prev, c, x) => {
      return !isNumeric(c) && c == "*" ? { ...prev, [`${x}-${y}`]: [] } : prev;
    }, {} as Dictionary<number[]>);
    return { ...prevSymbols, ...newSymbols };
  }, {} as Dictionary<number[]>);

  const newGears = lines.reduce((prevGears, line, y) => {
    const { lineGearParts } = [...line].reduce(
      (prev, c, x) => {
        const { adjacentGears, numStart, lineGearParts } = prev;

        if (isNumeric(c)) {
          const newAdjacentGears = Object.keys(gears).reduce((prev, sym) => {
            const [symX, symY] = sym.split("-").map(Number);
            const deltaX = Math.abs(symX - x);
            const deltaY = Math.abs(symY - y);
            return deltaX < 2 && deltaY < 2 && !prev.includes(sym)
              ? [...prev, sym]
              : prev;
          }, adjacentGears);

          const isAdjacent =
            adjacentGears.length > 0 || newAdjacentGears.length > 0;

          const curNumStart = numStart > -1 ? numStart : x;
          if (x >= line.length - 1 || !isNumeric(line[x + 1])) {
            if (!isAdjacent) {
              return {
                adjacentGears: [],
                numStart: -1,
                lineGearParts,
              };
            }
            const numStr = line.slice(curNumStart, x + 1);

            const newLineGearParts = newAdjacentGears.reduce((prev, cur) => {
              const prevParts = prev[cur];
              const newParts = [...prevParts, Number(numStr)];
              return { ...prev, [cur]: newParts };
            }, lineGearParts);

            return {
              adjacentGears: [],
              numStart: -1,
              lineGearParts: newLineGearParts,
            };
          }
          return {
            ...prev,
            adjacentGears: newAdjacentGears,
            numStart: curNumStart,
          };
        }
        return prev;
      },
      {
        adjacentGears: [] as string[],
        numStart: -1,
        lineGearParts: prevGears,
      }
    );
    return lineGearParts;
  }, gears);
  const validGears = Object.values(newGears).filter((g) => g.length == 2);
  const ratioSum = validGears.reduce((prev, [a, b]) => prev + a * b, 0);
  return ratioSum;
};

console.log();
console.log("1:", part1(input));
console.log("2:", part2(input));
