import strutils, sequtils, math, algorithm

template FILENAME: string = instantiationInfo().filename

const TEST = 0;

let day = FILENAME.split(".")[0];
var fn = day & "-input.txt";

if bool(TEST):
    fn = day & "-test.txt";

let contents = readFile(fn);
let fileLines = contents.strip().splitLines();

const lowerStart = int('a')
const upperStart = int('A')

var i = 0;
var 
    sum = 0
    sum2 = 0
for l in fileLines:
    var found = ""
    var 
        a = l.substr(0, int(l.len / 2) - 1)
        b = l.substr(int(l.len / 2), l.len)
    for c in a:
        if(not b.contains(c) or found.contains(c)): 
            continue
        found.add(c)
        var charCode = int(c)
        if(charCode >= lowerStart):
            charCode += -lowerStart + 1;
        else:
            charCode += -upperStart + 27;
        sum += charCode
        echo c, " ", charCode

    found = ""
    for c in l:
        if(( i + 1 ) mod 3 == 0):
            let 
                l2 = fileLines[i-1]
                l1 = fileLines[i-2]
            if(found.contains(c) or not l1.contains(c) or not l2.contains(c)):
                continue
            found.add(c)
            var charCode = int(c)
            if(charCode >= lowerStart):
                charCode += -lowerStart + 1;
            else:
                charCode += -upperStart + 27;
            sum2 += charCode

    i += 1;

echo "1: ", sum
echo "2: ", sum2
