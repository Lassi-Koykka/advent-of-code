import {readFileSync} from "fs";

const TEST = false

const num = __filename.split(".")[0]
const inputFileName = num + (TEST ?  "-test.txt" : "-input.txt")

const content = readFileSync(inputFileName).toString().trimEnd()

let dirs: string[] = []
let sizes  = new Map<string, number>()

const lines = content.split("\n")
for (let l of lines) {
  if(l.startsWith("$")) {
    let cmd = l.slice(2)
    let [a, b] = cmd.split(" ")
    if(a === "cd") {
      b === ".." 
        ? dirs.pop() 
        : (dirs.push(b))
    }
  } else {
    let [a] = l.split(" ")
    const val = Number(a)
    if(!val) continue
    for (let i = 0; i < dirs.length; i++) {
      const d = dirs.slice(0, i + 1).join("/")
      sizes.set(d, (sizes.get(d) ?? 0) + Number(a))
    }
  }
}

const freeSpace = 70000000 - sizes.get("/")
const reqSpace = 30000000 

let total = 0
let smallest = Infinity
for (let size of sizes.values()) {
  const val = size 
  if(val <= 100000) {
    total += val
  }
  const freed = freeSpace + size
  if(freed >= reqSpace && size <= smallest) smallest = size
}

console.log("1:", total)
console.log("2:", smallest)
