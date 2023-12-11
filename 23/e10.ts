import assert from "assert";
import { getContent } from "./utils";

const TEST = 0;
const TEST_FILE = 2;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 4;
const RESULT_TWO = 10;

const prepareInput = (data: string) => {
  const lines = data.split("\n").map((l) => [...l.trim()]);
  return lines;
};

const UP = [0, -1];
const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];

const DIRS = [UP, RIGHT, DOWN, LEFT];

const CONNECTIONS: { [char: string]: number[][] } = {
  "|": [UP, DOWN],
  "-": [LEFT, RIGHT],
  L: [UP, RIGHT],
  F: [DOWN, RIGHT],
  "7": [LEFT, DOWN],
  J: [UP, LEFT],
};

const EDGES = ["|", "F", "J", "L", "7"];

const getNextDir = (
  grid: string[][],
  [prevMoveX, prevMoveY]: number[],
  [curX, curY]: number[],
): number[] => {
  const char = grid[curY][curX];
  const nextDir = CONNECTIONS[char].filter(
    ([x, y]) => !(x === -prevMoveX && y === -prevMoveY),
  )[0];
  return nextDir;
};

const getStartPosChar = (grid: string[][], [sX, sY]: number[]) => {
  const [[x1, y1], [x2, y2]] = DIRS.filter(([dirX, dirY]) => {
    const x = sX + dirX;
    const y = sY + dirY;
    if (x < 0 || y < 0 || x > grid[0].length - 1 || y > grid.length - 1)
      return false;
    const c = grid[y][x];
    return (
      Object.keys(CONNECTIONS).includes(c) &&
      !!CONNECTIONS[c]
        .map(([dirX, dirY]) => [x + dirX, y + dirY])
        .find(([posX, posY]) => posX === sX && posY === sY)
    );
  });
  return Object.entries(CONNECTIONS).find(([key, value]) => {
    return (
      !!value.find(([x, y]) => x === x1 && y === y1) &&
      !!value.find(([x, y]) => x === x2 && y === y2)
    );
  })[0];
};

const getStartPos = (g: string[][]) => {
  return g.reduce((prev, l, y) => {
    return prev.length < 1
      ? l.reduce((prev2, c, x) => {
          return prev2.length < 1 && c === "S" ? [x, y] : prev2;
        }, prev)
      : prev;
  }, [] as number[]);
};

const traverse = (grid: string[][], pos: number[], dir: number[]) => {
  const pipeline = [pos];
  while (true) {
    const [x, y] = pipeline.at(-1);
    const [nextDirX, nextDirY] = getNextDir(grid, dir, [x, y]);
    const nextPos = [x + nextDirX, y + nextDirY];
    if (nextPos.join(",") === pos.join(",")) break;
    pipeline.push(nextPos);
    dir = [nextDirX, nextDirY];
  }
  return pipeline;
};

const part1 = (g: string[][]) => {
  const startPos = getStartPos(g);
  const [sX, sY] = startPos;

  const startChar = getStartPosChar(g, startPos);

  const grid = g.map((l, y) =>
    l.map((c, x) => (x === sX && y === sY ? startChar : c)),
  );

  const startDir = getNextDir(grid, [-1, -1], startPos);

  const pipeline = traverse(grid, startPos, startDir);
  return Math.ceil(pipeline.length / 2);
};

const part2 = (g: string[][]) => {
  const [sX, sY] = getStartPos(g);
  const startChar = getStartPosChar(g, [sX, sY]);

  const grid = g.map((l, y) =>
    l.map((c, x) => {
      return x === sX && y === sY ? startChar : c;
    }),
  );

  const startDir = CONNECTIONS[startChar][0];
  const pipeline = traverse(grid, [sX, sY], startDir);

  const cleanGrid = grid.map((l, y) =>
    l.map((c, x) =>
      pipeline.some(([x2, y2]) => x === x2 && y === y2) ? c : ".",
    ),
  );

  return cleanGrid.reduce((prev, line) => {
    const lineSum = line.reduce((prevLineSum, c, x) => {
      if (c !== ".") return prevLineSum;

      const edges = line.slice(x + 1).reduce((prevEdges, c2) => {
        const isCornerPair =
          (prevEdges.at(-1) === "F" && c2 === "J") ||
          (prevEdges.at(-1) === "L" && c2 === "7");
        return EDGES.includes(c2) && !isCornerPair
          ? [...prevEdges, c2]
          : prevEdges;
      }, [] as string[]);
      return edges.length > 0 && edges.length % 2 !== 0
        ? prevLineSum + 1
        : prevLineSum;
    }, 0);
    return prev + lineSum;
  }, 0);
};

const input = getContent(FILENAME);
const input2 = TEST ? getContent(`e10-test-2-${TEST_FILE}.txt`) : input;
const data = prepareInput(input);
const result1 = part1(data);
const result2 = part2(prepareInput(input2));

TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");

console.log("1:", result1);
console.log("2:", result2);
