import strutils, sequtils, math, algorithm

template FILENAME: string = instantiationInfo().filename

const TEST = 0;

let day = FILENAME.split(".")[0];
var fn = day & "-input.txt";

if bool(TEST):
    fn = day & "-test.txt";

let contents = readFile(fn);
let fileLines = contents.splitLines();

echo fileLines;

