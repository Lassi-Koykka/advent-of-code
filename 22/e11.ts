import {readFileSync} from "fs";
import {log} from "console"

import {
  // copy
  // matchAll
  // transpose
  // Graph
  // array,
  // array2D
} from "./utils"

const TEST = false

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt"

const content = readFileSync(inputFileName).toString().trimEnd()

const monkeArr = content.split("\n\n")
.map(m => m.split("\n")
     .map(l => l.split(":")[1] )
     .filter(Boolean)
    ).map(m => ({
      items: m[0].split(",").map(Number),
      operation: m[1].trim().split("= ")[1] ,
      test: Number(m[2].slice(m[2].lastIndexOf(" ") + 1)),
      monkeyIf: Number(m[3].slice(m[3].lastIndexOf(" ") + 1)),
      monkeyElse: Number(m[4].slice(m[4].lastIndexOf(" ") + 1)),
      inspects: 0
    }))

type MonkeyArray = typeof monkeArr

const prod = monkeArr.reduce((prev, m) => prev * m.test, 1)


const processMonkeys = (n: number, monkeys: MonkeyArray, part2?: boolean = false) => {

  if (n < 1) return monkeys

  const newMonkeys = monkeys.reduce((prevMonkeys, _, idx) => {

    const {inspects, items, operation, test, monkeyIf, monkeyElse} = prevMonkeys[idx]

    const newMonkeys = items.reduce((prevPrevMonkeys, item) => {
      const newOp = operation.replaceAll("old", item + "")
      const val = eval(newOp)
      const worry = part2 ? (val % prod) : Math.floor((val % prod) / 3)
      const targetMonkey = (worry % test === 0) ? monkeyIf : monkeyElse

      const newNewMonkeys = prevPrevMonkeys.map((mk, mId) => ({
        ...mk,
        items: 
          mId === targetMonkey
            ? [...mk.items, worry]
            : mId === idx
              ? mk.items.slice(1)
              :  mk.items
      }))

      return newNewMonkeys
    }, prevMonkeys)

    return newMonkeys.map((m, i) => i === idx ? ({...m, inspects: inspects + items.length }) : m)
  }, monkeys)
  return processMonkeys(n - 1, newMonkeys) 
}

const processMonkeys2 = (n: number, monkeys: MonkeyArray) => {
  let newMonkeys = monkeys;
  for (let i = 0; i < n; i++) {
    newMonkeys = processMonkeys(1, newMonkeys, true)
  }

  return newMonkeys 
}

const run = (n: number, monkeys: MonkeyArray, part2: boolean = false) =>
  (part2 ? processMonkeys2(n, monkeys) : processMonkeys(n, monkeys))
  .map(m => m.inspects)
  .sort((a, b) => a < b ? 1 : -1)
  .slice(0, 2)
  .reduce((prev, m) => m * prev, 1)

log()
log("1:", run(20, monkeArr))
log("2:", run(10000, monkeArr, true))
