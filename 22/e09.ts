import { readFileSync } from "fs";

const TEST = true;

const num = __filename.split(".")[0];
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt";

const content = readFileSync(inputFileName).toString().trimEnd();

const cmds = content
  .split("\n")
  .map((l) => l.split(" ").map((s) => Number(s) || s));


let move = (dir: string, x: number, y: number) => {
  switch (dir) {
    case "U":
      return [x, y + 1];
    case "D":
      return [x, y - 1];
    case "L":
      return [x - 1, y];
    case "R":
      return [x + 1, y];
    default:
      return [x, y];
  }
};


const run = (n: number) => {
  let visited = new Set()
  let knots = [];
  for (let x = 0; x < n; x++) knots.push([0, 0]);
  for (let c of cmds) {
    const [dir, n] = c;
    for (let i = 0; i < n; i++) {
      let h = knots[0];
      const [xn, yn] = move(`${dir}`, h[0], h[1]);
      //move head
      h[0] = xn;
      h[1] = yn;

      for (let idx = 1; idx < knots.length; idx++) {
        let prev = knots[idx - 1];
        let k = knots[idx];
        if (Math.abs(prev[0] - k[0]) > 1 || Math.abs(prev[1] - k[1]) > 1) {
          k[0] += Math.sign(prev[0] - k[0]);
          k[1] += Math.sign(prev[1] - k[1]);
        }
      }
      const last = knots[knots.length - 1];
      visited.add(last[0] + "," + last[1]);
    }
  }

  return visited.size
}

let r1 = run(2);
let r2 = run(10);

console.log("1:", r1);
console.log("2:", r2);
