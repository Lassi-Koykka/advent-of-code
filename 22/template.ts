import {readFileSync} from "fs";

import {
  // copy
  // matchAll
  // transpose
  // Graph
} from "./utils"

const TEST = true

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trimEnd()

let r1 = 0
let r2 = 0
console.log(content)

console.log("1:", r1)
console.log("2:", r2)
