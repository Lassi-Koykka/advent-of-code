import { getContent } from "./utils";

const TEST = 0;
const filename = __filename.split(".")[0] + (TEST ? "-test.txt" : "-input.txt");

const input = getContent(filename);

const prepareInput = (data: string) =>
  data.split("\n").map((line) =>
    line
      .replaceAll("  ", " ")
      .split(": ")[1]
      .split(" | ")
      .map((side) => side.split(" ").map(Number)),
  );

const part1 = (cards: number[][][]) => {
  const result = cards.reduce((prev, [nums, winNums]) => {
    const matches = nums.filter((num) => winNums.includes(num)).length;
    return matches > 0 ? prev + 2 ** (matches - 1) : prev;
  }, 0);
  return result;
};

const getWonCards = (id: number, winMemo: number[][], cardWins: number[][]) => {
  if (winMemo[id].length > 0) return winMemo[id];
  if (cardWins[id].length < 1) return [id];
  const accCards = cardWins[id].flatMap((wonId) =>
    getWonCards(wonId, winMemo, cardWins),
  );
  return [id, ...accCards];
};

const part2 = (cards: number[][][]) => {
  const cardWins = cards.reduce((prevWins, [nums, winNums], idx) => {
    const matches = nums.filter((num) => winNums.includes(num)).length;
    const wonCopies = cards.map((_, i) => i).slice(idx + 1, idx + matches + 1);
    return [...prevWins, wonCopies];
  }, [] as number[][]);

  const cardIds = cards.map((_, id) => id).reverse();

  const { sum } = cardIds.reduce(
    (prev, id) => {
      const { sum: prevSum, cardMemo } = prev;
      const cardWonCards = getWonCards(id, cardMemo, cardWins);
      const newCardMemo = cardMemo.map((t, memoIdx) =>
        memoIdx !== id ? t : cardWonCards,
      );
      return { sum: prevSum + cardWonCards.length, cardMemo: newCardMemo };
    },
    { sum: 0, cardMemo: new Array(cards.length).fill([] as number[]) },
  );

  return sum;
};

const cards = prepareInput(input);
console.log("1:", part1(cards));
console.log("2:", part2(cards));
