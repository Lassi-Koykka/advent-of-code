import {readFileSync} from "fs";

const TEST = true

//A - ROCK - 1
//Y - PAPER - 2
//Z - SCISSORS - 3

// WIN - 6
// DRAW - 3
// LOSE - 0

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trim()

const values = {
  "A": 1,
  "B": 2,
  "C": 3,
  "X": 1,
  "Y": 2,
  "Z": 3,
}

const loses = {
  1: 2,
  2: 3,
  3: 1
}
const wins = {
  1: 3,
  2: 1,
  3: 2
}

const lines = content.split("\n")
let sum = 0
let sum2 = 0
for (let l of lines) {
  const [a, b]: number[] = l.split(" ").map(v => values[v])
  const state = b
  sum += b

  if(a === b) sum += 3
  else if(a === loses[b]) {
    sum += 6;
  }

  sum2 += (state - 1) * 3
  switch(state) {
    case 1:
      sum2 += wins[a];
      break;
    case 2:
      sum2 += a
      break;
    case 3:
      sum2 += loses[a]
      break;
  }

}

console.log("1: ", sum)
console.log("2: ", sum2)

