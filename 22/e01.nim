import strutils, sequtils, math, algorithm

template FILENAME: string = instantiationInfo().filename

const TEST = 0

let day = FILENAME.split(".")[0]
var fn = day & "-input.txt"

if bool(TEST):
    fn = day & "-test.txt"

let 
    contents = readFile(fn)
    parts = contents.strip().split("\n\n")

var sums: seq[int] = @[]
for p in parts:
    let nums = p.splitLines().map(parseInt)
    sums.add(sum(nums))

sums.sort(SortOrder.Descending)

echo "1:" & sums[0].intToStr()
echo "2:" & sum(sums[0..<3]).intToStr()
