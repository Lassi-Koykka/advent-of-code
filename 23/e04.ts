import { getContent } from "./utils";

const TEST = 0;
const filename = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");

const input = getContent(filename);

const parseCards = (data: string) =>
  data.split("\n").map((line) =>
    line
      .replaceAll("  ", " ")
      .split(": ")[1]
      .split(" | ")
      .map((side) => side.split(" ").map(Number)),
  );

const part1 = (data: string) => {
  const cards = parseCards(data);
  const result = cards.reduce((prev, [nums, winNums]) => {
    const matches = nums.filter((num) => winNums.includes(num)).length;
    return matches > 0 ? prev + 2 ** (matches - 1) : prev;
  }, 0);
  return result;
};

const part2 = (data: string) => {
  const cards = parseCards(data);

  const cardWins = cards.reduce((prevWins, [nums, winNums], idx) => {
    const matches = nums.filter((num) => winNums.includes(num)).length;
    const wonCopies = cards
      .map((_, id) => id)
      .slice(idx + 1, idx + matches + 1);
    return [...prevWins, wonCopies];
  }, [] as number[][]);

  const getAllCards = (idx: number): number[] => {
    if (cardWins[idx].length < 1) return [idx];
    return [idx, ...cardWins[idx].flatMap((wonId) => getAllCards(wonId))];
  };

  const result = cards.reduce(
    (prevSum, _, idx) => prevSum + getAllCards(idx).length,
    0,
  );

  return result;
};

console.log();
console.log("1:", part1(input));
console.log("2:", part2(input));
