import {readFileSync} from "fs";

const TEST = true

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const transpose = (arr: any[][]) => arr[0].map((_, col) => arr.map(row => row[col]))
const copy = (val: any) => JSON.parse(JSON.stringify(val))
const matchAll = (s:string, regex: RegExp) => [...s.matchAll(regex)].map(r => r[1])


const content = readFileSync(inputFileName).toString().trimEnd()

console.log(content)
