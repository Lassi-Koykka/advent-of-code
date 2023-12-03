import { getContent, isNumeric } from "./utils"

const TEST = 0
const DAY = __filename.split(".")[0]
const CREATE_FILES = 0

const input = getContent(TEST ? DAY + "-test.txt" : DAY + "-input.txt", !!CREATE_FILES)

const part1 = (data: string) => {
  const lines = data.split("\n")

  const symbols = lines.reduce((prevSymbols, line, y) => {
    const newSymbols = [...line].reduce((prev, c, x) => {
      if(!isNumeric(c) && c !== ".")
        return {...prev, [`${x}-${y}`]: c};
      return prev;
    }, {} as {[key: string]: string})
    return {...prevSymbols, ...newSymbols}
  }, {} as {[key: string]: string})

  const symbolLocations = Object.keys(symbols)
            .map(sym =>  sym.split("-").map(Number))

  const sum = lines.reduce((prevSum, line, y) => {
    const {lineSum} = [...line].reduce((prev, c, x) => {
      const { adjecent, numStart, lineSum } = prev;
      if(isNumeric(c)) {
        const isAdjacent = adjecent || symbolLocations.some(([symX, symY]) => {
              const deltaX = Math.abs(symX - x);
              const deltaY = Math.abs(symY - y);
              return deltaX < 2 && deltaY < 2 
            });
        const curNumStart = numStart > -1 ? numStart : x;
        if(x >= line.length - 1 || !isNumeric(line[x + 1])) {
          if(!isAdjacent) {
            return {
              adjecent: false, 
              numStart: -1, 
              lineSum: lineSum
            }
          }
          const numStr = line.slice(curNumStart, x + 1);
          return {
            adjecent: false, 
            numStart: -1, 
            lineSum: lineSum + Number(numStr)
          }
        }
        return {
          ...prev,
          adjecent: isAdjacent,
          numStart: curNumStart,
        }
      }
      return prev;
    }, {adjecent: false, numStart: -1, lineSum: 0})
    return prevSum + lineSum;
  }, 0)

  return sum;
}

console.log()
console.log("1:", part1(input))
// log("2:", run(input))
