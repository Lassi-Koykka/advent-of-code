import {readFileSync} from "fs";

const TEST = false

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trim()
const lines = content.split("\n")

let sum = 0
let sum2 = 0
for (let l of lines) {
  const [a, b] = l.split(",")
  const [s1,e1] = a.split("-").map(Number)
  const [s2,e2] = b.split("-").map(Number)

  if((s1 >= s2 && e1 <= e2) || (s2 >= s1 && e2 <= e1)) sum++; 
  if(Math.max(s1,s2) <= Math.min(e1,e2)) sum2++;
}

console.log("1:", sum)
console.log("2:", sum2)
