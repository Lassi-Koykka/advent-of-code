import {log} from "console"
import { getContent } from "./utils"

const CREATE_FILES = false
const DAY = __filename.split(".")[0]
const TEST = false

const input = getContent(TEST ? DAY + "-test.txt" : DAY + "-input.txt", CREATE_FILES)


const inOrder = (listA: any[], listB: any[]) => {
  if(JSON.stringify(listA) === JSON.stringify(listB)) return true
  else if(listB.length < 1) return false;
  else if(listA.length < 1) return true;

  const a = listA[0]
  const b = listB[0]

  if (JSON.stringify(a) === JSON.stringify(b)) 
    return inOrder(listA.slice(1), listB.slice(1))
  else if (Array.isArray(a) && Array.isArray(b))
    return inOrder(a, b)
  else if (!Array.isArray(a) && !Array.isArray(b))
    return a < b
  else if (Array.isArray(a)) 
    return inOrder(listA, [[b], ...listB.slice(1)])
  else if (Array.isArray(b)) 
    return inOrder([[a], ...listA.slice(1)], listB)
}

const dividers = [[[2]], [[6]]]

const run = (data: string, part: number = 1) => {
  const packets = data.split("\n\n")
  .map(p => p.split("\n").map(pp => JSON.parse(pp)))

  const sum = packets.reduce((prevSum, pair, i) => {
    const listA = pair[0]
    const listB = pair[1]
    const isInOrder = inOrder(listA, listB)
    return isInOrder ? prevSum + i + 1 : prevSum
  }, 0)


  const orderedPackets = packets.reduce(
    (prev, packets) => [...prev, ...packets], 
    dividers
  ).sort((a, b) => inOrder(a, b) ? -1 : 1)

  const decoderKey = orderedPackets.reduce(
    (prev, packet, i) => {
      if(dividers.some(d => JSON.stringify(d) === JSON.stringify(packet))) return prev * (i + 1);
      return prev;
    }, 1)

  return part === 2 ? decoderKey : sum
}

log()
log("1:", run(input))
log("2:", run(input, 2))
