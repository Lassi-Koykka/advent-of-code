import {readFileSync} from "fs";

import {
  // copy
  // matchAll
  // transpose
  // Graph
} from "./utils"

const TEST = false

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trimEnd()
const trees = content.split("\n").map(l => [...l].map(Number))

let r1 = 0
let r2 = 0


const w = trees[0].length
const h = trees.length

r1 += (w + h) * 2 - 4

for (let y = 1; y < h - 1; y++ ) {
  const row = trees[y]
  for (let x = 1; x < w -1; x++ ) {
    const t = row[x]
    const col = trees.flatMap((l) => l.filter(( _, x2 ) => x2 === x))
    const sides = [
        col.slice(0, y).reverse(),
        col.slice(y + 1),
        row.slice(0, x).reverse(), 
        row.slice(x + 1)
      ]

    const visible = sides.some(s => s.every(t2 => t2 < t))

    const viewDistance = sides.reduce((prev, s, i) =>  {
        if (s.length < 1) return 0;
        const dist = s.findIndex(t2 => t2 >= t) + 1
        return prev * (dist > 0 ? dist : s.length)
      }, 1)

    if(visible) r1++;
    if(viewDistance > r2) r2 = viewDistance

  }
}

console.log("1:", r1)
console.log("2:", r2)
