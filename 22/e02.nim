import strutils, tables

template FILENAME: string = instantiationInfo().filename

const TEST = 1;


let day = FILENAME.split(".")[0];
var fn = day & "-input.txt";

if bool(TEST):
    fn = day & "-test.txt";

let contents = readFile(fn);

let values = {"A": 1, "B": 2, "C": 3, "X": 1, "Y": 2, "Z": 3}.toTable;
let loses = {1: 2, 2: 3, 3: 1}.toTable;
let wins = {1: 3, 2: 1, 3: 2}.toTable;

let fileLines = contents.strip().splitLines();


var sum = 0
var sum2 = 0
for l in fileLines:
    var sides = l.split(" ")
    var a = values[sides[0]]
    var b = values[sides[1]]

    sum += b
    if (a == b):
        sum += 3
    elif (loses[a] == b):
        sum += 6

    if(b == 2):
        sum2 += a
    elif(b == 1):
        sum2 += wins[a]
    elif(b == 3):
        sum2 += loses[a]

    sum2 += (b - 1) * 3


echo "1: ", sum
echo "2: ", sum2
