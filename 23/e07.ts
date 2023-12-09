import assert from "assert";
import { getContent } from "./utils";

const TEST = 0;
const FILENAME = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");
const RESULT_ONE = 6440;
const RESULT_TWO = 5905;

const prepareInput = (data: string) => {
  const hands = data.split("\n").map((l) => l.split(" "));
  return hands;
};

const enum TYPES {
  HIGH,
  ONE_PAIR,
  TWO_PAIR,
  THREE,
  FULL_HOUSE,
  FOUR,
  FIVE,
}

const CARDS = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const getType = (cardCounts: number[]) => {
  if (cardCounts[0] === 5) {
    return TYPES.FIVE;
  } else if (cardCounts[0] === 4) {
    return TYPES.FOUR;
  } else if (cardCounts[0] === 3) {
    return cardCounts[1] === 2 ? TYPES.FULL_HOUSE : TYPES.THREE;
  } else if (cardCounts[0] === 2) {
    return cardCounts[1] === 2 ? TYPES.TWO_PAIR : TYPES.ONE_PAIR;
  }
  return TYPES.HIGH;
};

const rankHand = (str: string) => {
  const cFreq = [...str].reduce(
    (prev, curCard) => ({ ...prev, [curCard]: (prev[curCard] ?? 0) + 1 }),
    {} as { [key: string]: number },
  );
  const jokers = cFreq["1"] ?? 0;
  const cardFreq = {
    ...cFreq,
    "1": 0,
  };
  const cardCounts = Object.values(cardFreq).sort((a, b) => (a > b ? -1 : 1));
  return getType(cardCounts.map((val, i) => (i === 0 ? val + jokers : val)));
};

const cmpTie = (a: string, b: string) => {
  return [...a].reduce((curr, c, i) => {
    if (curr !== 0) return curr;
    const aCardVal = CARDS[c];
    const bCardVal = CARDS[b.charAt(i)];
    if (aCardVal > bCardVal) return 1;
    else if (aCardVal < bCardVal) return -1;
    return 0;
  }, 0);
};

const part1 = (hands: string[][]) => {
  return hands
    .sort(([a], [b]) => {
      const aVal = rankHand(a);
      const bVal = rankHand(b);
      if (aVal !== bVal) return aVal > bVal ? 1 : -1;
      return cmpTie(a, b);
    })
    .reduce((curr, [_, val], i) => curr + Number(val) * (i + 1), 0);
};

const part2 = (hands: string[][]) => {
  return hands
    .map(([cards, val]) => [cards.replaceAll("J", "1"), val])
    .sort(([a], [b]) => {
      const aVal = rankHand(a);
      const bVal = rankHand(b);
      if (aVal !== bVal) return aVal > bVal ? 1 : -1;
      return cmpTie(a, b);
    })
    .reduce((curr, [_, val], i) => curr + Number(val) * (i + 1), 0);
};

const input = getContent(FILENAME);
const data = prepareInput(input);
const result1 = part1(data);
const result2 = part2(data);

console.log("1:", result1);
console.log("2:", result2);

TEST && assert.equal(result1, RESULT_ONE, "RESULT 1 INCORRECT");
TEST && assert.equal(result2, RESULT_TWO, "RESULT 2 INCORRECT");
