import time

test = 0

# Setup here
f = open("inputtest" if test else "input")
fileContent = f.read()
data = fileContent.replace("|\n", " | ").split("\n")


print()


def puzzle1(input):
    startTime = time.time()

    total = 0

    # CODE
    for pair in input:
        s = pair.strip().split(" | ")
        sig = s[0]
        out = s[1]

        for d in out.split(" "):
            l = len(d)
            # Digits 1 4 7 8 are unique
            if(l == 2 or l == 4 or l == 3 or l == 7):
                total += 1

    endTime = time.time()

    print(total)
    print("Took", (endTime - startTime) * 1000000, "us")


def puzzle2(input):

    segments = {}

    digitsSegs = {
        "abcefg": 0,
        "cf": 1,
        "acdeg": 2,
        "acdfg": 3,
        "bcdf": 4,
        "abdfg": 5,
        "abdefg": 6,
        "acf": 7,
        "abcdefg": 8,
        "abcdfg": 9
    }

    knownValues = {
        2: 1,
        3: 7,
        4: 4,
        7: 8
    }

    X = {}
    for c in "abcdefg":
        X[c] = []

    for segs in digitsSegs:
        for c in segs:
            X[c].append(len(segs))

    for x in X:
        X[x].sort()
        segments["".join([str(num) for num in X[x]])] = x

    startTime = time.time()

    total = 0

    # CODE
    for pair in input:
        translations = {}
        s = pair.strip().split(" | ")
        signals = s[0].strip().split(" ")
        output = s[1].strip().split(" ")

        Y = {}
        for c in "abcdefg":
            Y[c] = []

        for sig in signals:
            for c in sig:
                Y[c].append(len(sig))

        for y in Y:
            Y[y].sort()
            key = "".join([str(num) for num in Y[y]])
            translations[y] = segments[key]

        outputNum = ""

        for d in output:
            l = len(d)
            if(l == 2 or l == 4 or l == 3 or l == 7):
                outputNum += str(knownValues[l])
            else:
                realSegments = "".join(sorted([translations[seg] for seg in d]))
                outputNum += str(digitsSegs[realSegments])

        print(outputNum)
        total += int(outputNum)

    endTime = time.time()

    print(total)
    print("Took", (endTime - startTime) * 1000000, "us")


# RUN
puzzle1(data)
puzzle2(data)
