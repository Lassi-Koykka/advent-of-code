import assert from "assert";
import { getContent } from "./utils";

const TEST = 1;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 2;
const RESULT_TWO = 6;

const prepareInput = (data: string) => {
  const [dirsStr, nodeStrs] = data.split("\n\n").map((l) => l.trim());
  const dirs = [...dirsStr];
  const nodes = nodeStrs.split("\n").reduce(
    (prev, s) => {
      const [key, L, R] = s
        .replace(" = ", " ")
        .replace(/[,\(\)]/g, "")
        .split(" ");
      return { ...prev, [key]: { L, R } };
    },
    {} as { [key: string]: { [key: string]: string } },
  );
  return { dirs, nodes };
};

interface IData {
  dirs: string[];
  nodes: { [key: string]: { [key: string]: string } };
}

const gcd = (x: number, y: number) => (y === 0 ? x : gcd(y, x % y));
const lcm = (n: number[]) => n.reduce((x, y) => (x * y) / gcd(x, y));

const part1 = ({ dirs, nodes }: IData) => {
  let cur = "AAA";
  for (let steps = 0; true; steps++) {
    if (cur === "ZZZ") return steps;
    const turn = dirs[steps % dirs.length];
    cur = nodes[cur][turn];
  }
};

const part2 = ({ dirs, nodes }: IData) => {
  let starts = Object.keys(nodes).filter((k) => k[k.length - 1] === "A");
  let curs = starts.map((s) => `${s}`);

  const getPossibleExits = (start: string) => {
    let visited = {};
    let cur = start;
    for (let steps = 0; true; steps++) {
      visited[steps % dirs.length] = cur;
      if (cur[cur.length - 1] === "Z") {
        return steps;
      }
      const turn = dirs[steps % dirs.length];
      cur = nodes[cur][turn];
    }
  };

  const prod = curs.map((c) => getPossibleExits(c));
  return lcm(prod);
};

const input = getContent(FILENAME);
const data = prepareInput(input);
const result1 = part1(data);
const result2 = part2(TEST ? prepareInput(getContent("e08-test-2.txt")) : data);

TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");

console.log("1:", result1);
console.log("2:", result2);
