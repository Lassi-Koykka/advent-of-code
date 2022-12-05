import {readFileSync} from "fs";

const TEST = false

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trimEnd()
const [stacksStr, movesStr] = content.split("\n\n")

const transpose = (arr: any[][]) => arr[0].map((_, col) => arr.map(row => row[col]))
const copy = (val: any) => JSON.parse(JSON.stringify(val))

let stackRows = stacksStr.split("\n")
.map(r => r.split("").filter((_, i) => (i + 3) % 4 === 0)).slice(0, -1)

let stacks = transpose(stackRows)
  .map(r => r.filter(c => c !== " ").reverse())

const moves: number[][] = movesStr
  .split("\n")
  .map(l => l.split(" ").filter((_, i) => (i + 1) % 2 === 0).map(Number))

let stacks1 = copy(stacks)
let stacks2 = copy(stacks)

for (let m of moves) {
  const [n, from, to] = m
  for (let x = 0; x < n; x++) {
    const c = stacks1[from - 1]?.pop()
    if(!c) continue;
    stacks1[to - 1].push(c)
  }
  const moved = stacks2[from - 1].splice(-n)
  stacks2[to - 1].push(...moved) 
}

let result1 = ""
for (let s of stacks1) {
  result1 += s[s.length - 1]
}

let result2 = ""
for (let s of stacks2) {
  result2 += s[s.length - 1]
}

console.log("1:", result1);
console.log("2:", result2);
