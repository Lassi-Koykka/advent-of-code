import {readFileSync} from "fs";

const TEST = 0

const sum = (nums: number[]) => {
  let s = 0
  for (let n of nums) {
    s += n
  }
  return s
}

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test" : num + ""

const content = readFileSync(inputFileName).toString()

const parts = content.split("\n\n")

let sums: number[] = []
for (let p of parts) {
  const nums = p.split("\n").map(Number)
  sums.push(sum(nums))
}

sums.sort((a,b) => a < b ? 1 : -1)

console.log("1: ", sums[0])
console.log("2: ", sum(sums.slice(0,3)))

