import {readFileSync} from "fs";

const TEST = true

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trimEnd()

// console.log(content)
let result1 = -1
for (let i = 3; i < content.length; i++) {
  const slice = content.slice(i - 3, i + 1)
  let chars: {[char: string]: boolean} =  {}
  let found = true;
  for (let c of slice) {
    if(chars[c]) {
      found = false;
      break
    } else chars[c] = true
  }
  if(found) {
    result1 = i + 1
    break
  }
}

let result2 = -1
for (let i = 13; i < content.length; i++) {
  const slice = content.slice(i - 13, i + 1)
  let chars: {[char: string]: boolean} =  {}
  let found = true;
  for (let c of slice) {
    if(chars[c]) {
      found = false;
      break
    } else chars[c] = true
  }
  if(found) {
    result2 = i + 1
    break
  }
}

console.log("1:", result1)
console.log("2:", result2)
