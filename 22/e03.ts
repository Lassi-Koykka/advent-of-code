import {readFileSync} from "fs";

const TEST = false

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trim()
const lines = content.split("\n")
const char = "A"
const lowerStart = char.toLowerCase().charCodeAt(0)
const upperStart = char.charCodeAt(0)
let groups: string[][] = []

let sum = 0
let sum2 = 0
let i = 0
for (let l of lines) {
  const group = Math.floor(i / 3)
  groups[group] = [...(groups[group] || []), l]
  const part1 = l.slice(0, l.length  / 2)
  const part2 = l.slice(l.length  / 2)

  let found = ""
  for (let c of part1) {
    if(part2.includes(c) && !found.includes(c)){
      found += c
      let charCode = c.charCodeAt(0)
      if(charCode >= lowerStart) charCode += -lowerStart + 1;
      else charCode += -upperStart + 27;
      console.log(c, charCode)
      sum += charCode
    }
  }
  i++;
}

for (let g of groups ){
    let found = ""
    for (let c of g[0]) {
      if(!found.includes(c) && g[1].includes(c) && g[2].includes(c)) {
          found += c
          let charCode = c.charCodeAt(0)
          if(charCode >= lowerStart) charCode += -lowerStart + 1;
          else charCode += -upperStart + 27;
          console.log(c, charCode)
          sum2 += charCode
      }
    }
}


console.log(sum)
console.log(sum2)





