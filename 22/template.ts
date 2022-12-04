import {readFileSync} from "fs";

const TEST = true

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trim()

console.log(content)
