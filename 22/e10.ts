import { readFileSync } from "fs";

import // copy
// matchAll
// transpose
// Graph
"./utils";

const TEST = false;

const num = __filename.split(".")[0];
const inputFileName = TEST ? num + "-test.txt" : num + "-input.txt";

const content = readFileSync(inputFileName).toString().trimEnd();
const lines = content.split("\n");

let cycles = 0;
let x = 1;

let sum = 0;

const w = 40;
const h = 6;

let crt = "";

for (let l of lines) {
  if (l.startsWith("addx")) {
    // console.log(l)
    let num = Number(l.split(" ")[1]);
    for (let i = 0; i < 2; i++) {
      if (cycles % 40 === 20) {
        const signal = cycles * x;
        sum += signal;
      }

      cycles % w > x - 2 && cycles % w < x + 2 ? (crt += "#") : (crt += ".");
      cycles += 1;
    }
    x += num;
  } else {
    cycles % w > x - 2 && cycles % w < x + 2 ? (crt += "#") : (crt += ".");

    if (cycles % 40 === 20) {
      const signal = cycles * x;
      sum += signal;
    }

    cycles += 1;
  }
  let view = "";
  for (let i = 0; i < h; i++) {
    view = view + "\n" + crt.slice(i * w, (i + 1) * w);
  }

  console.log(view);
}

let r1 = sum;
let r2 = 0;
// console.log(content)

console.log("1:", r1);
console.log("2:", r2);
