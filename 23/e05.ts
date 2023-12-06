import assert from "assert";
import { getContent } from "./utils";

const TEST = 1;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 35;
const RESULT_TWO = 46;

const prepareInput = (data: string) => {
  const [seedsStr, ...mapsStrs] = data.split("\n\n");
  const seeds = seedsStr.split(": ")[1].split(" ").map(Number);
  const maps = mapsStrs.map((ms) =>
    ms
      .split(":\n")[1]
      .split("\n")
      .map((r) => r.split(" ").map(Number)),
  );
  return { seeds, maps };
};

const part1 = ({ seeds, maps }: { seeds: number[]; maps: number[][][] }) => {
  const minLocation = seeds.reduce((prevMinLoc, s) => {
    const location = maps.reduce((num, m) => {
      const result = m.reduce(
        (prevResult, line) => {
          if (prevResult.found) return prevResult;
          const [dest, start, len] = line;
          if (num < start || num > start + len - 1) return prevResult;
          return { num: dest + (num - start), found: true };
        },
        { num, found: false },
      );
      return result.num;
    }, s);
    return location < prevMinLoc ? location : prevMinLoc;
  }, Infinity);
  return minLocation;
};

const part2 = ({ seeds, maps }: { seeds: number[]; maps: number[][][] }) => {
  const seedRanges = seeds
    .reduce((pairs, _, i) => {
      return i % 2 === 0 ? [...pairs, seeds.slice(i, i + 2)] : pairs;
    }, [] as number[][])
    .map(([start, len]) => [start, start + len]);

  const candidateSeeds = maps
    .flatMap((mapLines, i) =>
      mapLines.map((map) => {
        const mapsLeft = maps.slice(0, i + 1);
        return mapsLeft.reduceRight((curr, lines) => {
          const l = lines.find((l) => curr >= l[0] && curr < l[0] + l[2]);
          return l ? l[1] + (curr - l[0]) : curr;
        }, map[0]);
      }),
    )
    .filter((s) => seedRanges.some(([start, end]) => s >= start && s < end));

  const result = candidateSeeds.reduce((prevMin, seed) => {
    const val = maps.reduce((curr, mappings) => {
      const m = mappings.find((m) => curr >= m[1] && curr <= m[1] + m[2]);
      return m ? m[0] + (curr - m[1]) : curr;
    }, seed);
    return val < prevMin ? val : prevMin;
  }, Infinity);

  return result;
};

const input = getContent(FILENAME);
const data = prepareInput(input);
const result1 = part1(data);
const result2 = part2(data);

console.log("1:", result1);
console.log("2:", result2);
TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");
