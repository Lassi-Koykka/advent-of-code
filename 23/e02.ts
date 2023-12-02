import { getContent } from "./utils"

const CREATE_FILES = false
const DAY = __filename.split(".")[0]
const TEST = false

const input = getContent(TEST ? DAY + "-test.txt" : DAY + "-input.txt", CREATE_FILES)

const MAX_COLORS = { "red": 12, "green": 13, "blue": 14 }

const part1 = (data: string) => {
  const lines = data.trim().split("\n")
  const result = lines.reduce((prev, l, idx) => {
    const id = idx + 1
    const hands = l.split(": ")[1].split("; ")
    const possible = hands.every(h => {
      const cubes = h.split(", ");
      return cubes.every((c) => {
        const [num, color] = c.split(" ") ;
        return MAX_COLORS[color] >= Number(num)
      })
    })
    return possible ? prev + id : prev;
  }, 0)
  return result
}

const part2 = (data: string) => {
  const lines = data.trim().split("\n")
  const result = lines.reduce((prev, l) => {
    const cubes = l.split(": ")[1].replaceAll(";", ",").split(", ");
    const minCubes = cubes.reduce((prevMin, c) => {
      const [num, color] = c.split(" ") ;
      if(!prevMin[color] || prevMin[color] < Number(num))
        return {...prevMin, [color]: Number(num)}
      return prevMin
    }, {} as {[key:string]: number})
    const power = Object.values(minCubes)
      .reduce((prevPower, val) => prevPower * val,1)
    return prev + power;
  }, 0)
  return result
}

console.log()
console.log("1:", part1(input))
console.log("2:", part2(input))
