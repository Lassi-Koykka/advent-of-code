import {log} from "console"
import { getContent } from "./utils"

const CREATE_FILE = false
const DAY = __filename.split(".")[0]
const TEST = false

const input = getContent(TEST ? DAY + "-test.txt" : DAY + "-input.txt", true)

const CHAR_START = 97

const getAdjecent = (grid: any[][], x: number, y: number, ) => {
    const h = grid.length
    const w = grid[0].length

    return [
      [x+1, y  ],
      [x-1, y  ],
      [x,   y-1],
      [x,   y+1],
    ].filter(([ax, ay]) => 
      !(ax < 0 || ay < 0 || ax > w - 1 || ay > h - 1)
    )
}

// RIP Functional approach
const dijkstra = 
  ({nodes, cur, end}: 
   {
     nodes: {[key: string]: Node}, 
     cur: string
     end: string
   }) => {
     const curNode = nodes[cur]
     if(cur === end) 
       return nodes;

     log(cur)

     const adjUpdatedNodes = curNode.adj
       .reduce((prev, id, i) => {
         const a = prev[id]
         if(a.visited || a.cost < curNode.cost + 1) 
           return prev;
         return {
           ...prev,
           [id]: {
             ...a,
             cost: curNode.cost + 1,
             prev: cur
           }
         }
     }, {...nodes})

     const newNodes = {
       ...adjUpdatedNodes,
       [cur]: {
         ...adjUpdatedNodes[cur],
         visited: true
       }
     }

     const [next] = Object.entries(newNodes)
       .filter(([,val]) => !val.visited)
       .sort(([,a],[,b]) => a.cost > b.cost ? 1 : -1)[0]

     return dijkstra({nodes: newNodes, cur: next, end})
     // return newNodes
}


const dijkstraImperative = 
  ({nodes, start, end}: 
   {
     nodes: {[key: string]: Node}, 
     start: string
     end?: string
   }) => {
     let cur = start
     nodes[cur].cost = 0
     while(cur !== end)  {
         let curNode = nodes[cur]
         nodes = curNode.adj.reduce((prev, id) => {
             const a = prev[id]
             if(a.visited || a.cost < curNode.cost + 1) 
               return prev;

               nodes[id] = {
                 ...a,
                 cost: curNode.cost + 1,
                 prev: cur
               }
             return nodes
         }, nodes)

         curNode.visited = true

         const queue = Object.entries(nodes)
           .filter(([,val]) => !val.visited)
           .sort(([,a],[,b]) => a.cost > b.cost ? 1 : -1);

         if(queue.length < 1) return nodes
         let [next] = queue[0]
        cur = next
       }
      return nodes;
}

type Node = 
  {
    cost: number, 
    value: number, 
    prev: string | null, 
    visited: boolean,
    adj: string[]
}


const run = (data: string, part: number) => {
  const {heights, start, end}: {heights: number[][], start: string, end: string} = 
    data.split("\n").reduce((prevRow, r, y) => {
      const {rowHeights, start, end} = 
        r.split("").reduce(
          (prev, char, x) => { 
            const start = char === "S" ? x+","+y : null
            const end = char === "E" ? x+","+y : null
            const c = start ? "a" : end ? "z" : char
            const height = c.charCodeAt(0) - (CHAR_START - 1)

            return { 
              rowHeights: [...prev.rowHeights, height], 
              start: start ? start : prev.start, 
              end: end ? end : prev.end
            }
          }, {rowHeights: [] as number[], start: null as string | null, end: null as string | null})

          return {
            heights: [...prevRow.heights, rowHeights],
            start: start ? start : prevRow.start, 
            end: end ? end : prevRow.end
          }
  }, {heights: [] as number[][], start: null, end: null})

  const nodes = heights.reduce((prevGraph1, r,y) => ({
    ...prevGraph1, 
    ...r.reduce((prevGraph2, h,x) => ({
      ...prevGraph2, 
      [x+","+y]: {
      cost: Infinity,
      visited: false,
      value: h,
      prev: null,
      adj: getAdjecent(heights, x, y).filter(([ax, ay]) => !(heights[ay][ax] - heights[y][x] > 1)).map(([ax, ay]) => ax+","+ay)
    }}), 
  {} as {[key: string]: Node})}), 
  {} as {[key: string]: Node})

  const nodes2 = heights.reduce((prevGraph1, r,y) => ({
    ...prevGraph1, 
    ...r.reduce((prevGraph2, h,x) => ({
      ...prevGraph2, 
      [x+","+y]: {
      cost: Infinity,
      visited: false,
      value: h,
      prev: null,
      adj: getAdjecent(heights, x, y).filter(([ax, ay]) => !(heights[y][x] - heights[ay][ax] > 1)).map(([ax, ay]) => ax+","+ay)
    }}), 
  {} as {[key: string]: Node})}), 
  {} as {[key: string]: Node})

  log("Start", start)
  log("End", end)

  // log(heights.map(r => r.join(",")).join("\n"))

  const result = part === 1 
    ? dijkstraImperative({nodes, start, end})[end].cost
    : Math.min(...Object.values(dijkstraImperative({nodes: nodes2, start: end})).filter(n => n.value === 1).map(n => n.cost))
  return result
}


log("1:")
log(run(input, 1))
log("2:")
log(run(input, 2))
