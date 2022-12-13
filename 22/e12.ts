import {log} from "console"
import { getContent } from "./utils"

const CREATE_FILE = false
const DAY = __filename.split(".")[0]
const TEST = true

const input = getContent(TEST ? DAY + "-test.txt" : DAY + "-input.txt", true)

const CHAR_START = 97

const printGrid = (grid: any[][]) => {
  log()
  log(grid.map(r => r.map(c => c === Infinity ? "." : "" + c).join(",")).join("\n"))
  log()
}

const findPos = (num: number, grid: number[][]) => 
  grid.reduce((prev, r, y) => {
    const x = r.findIndex(n => n === num) ?? -1
    return x !== -1 ? [y, x] : prev
  }, [-1,-1])

const dijkstra = 
  ({grid, shortestPaths, cx, cy}: 
   {grid: number[][], shortestPaths: number[][], cx: number, cy: number}) => {
    const adj = [
      [cx+1, cy  ],
      [cx-1, cy  ],
      [cx,   cy-1],
      [cx,   cy+1],
    ].filter(([ax, ay]) => ax >= 0 && ay >= 0)

    log("cur:", cx, cy, "->", adj.map(([ax,ay]) => ax + "," + ay + " " + grid[ay][ax]))

  return adj.reduce((prevShortest, [x, y]) => {
    try {
      log("Processing", x,y)
      if((((grid[y][x] - grid[cy][cx]) > 1 && grid[y][x] !== -1) 
          || prevShortest[y][x] <= prevShortest[cy][cx] + 1))
        return prevShortest

      const newShortestPaths = prevShortest
        .map((r, ty) => r.map((n, tx) => 
                              (tx === x && ty === y) 
                                ? prevShortest[cx][cy] + 1 
                                : n
                             ))

      const result = dijkstra({grid, shortestPaths: newShortestPaths, cx: x, cy: y})
      return result
     } catch (err) { 
       return prevShortest
     }
  }, shortestPaths)
}

const run = (data: string) => {

  const grid = data.split("\n").map(r => r.split("").map(c => {
    const height = c.charCodeAt(0) - (CHAR_START - 1)
    if(height < 0) 
      return height < -14 ? -1 : 0
    return height
  }));

  printGrid(grid)


  const [sx, sy] = findPos(0, grid);
  const [ex, ey] = findPos(-1, grid);

  log("S", sx, sy)

  const shortestPaths = grid.map((r, y) => r.map((_, x) => x === sx && y === sy ? 0 : Infinity))

  const result = dijkstra({grid, shortestPaths, cx: sx, cy: sy})

  return result
}


log()
log("1:") 
printGrid(run(input))
log("2:")
// printGrid(run(input))
