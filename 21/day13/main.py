import time

test = 1

# Setup here
f = open("inputtest" if test else "input")
fileContent = f.read()
data = fileContent.strip().split("\n\n")

def puzzle1 (input):
    dotsStrs = input[0].split('\n')
    dots = [s.split(',') for s in dotsStrs] 
    foldsStrs = input[1].split('\n')
    folds = [s.replace('fold along ', '').split('=') for s in foldsStrs] 
    # print(dots)
    # print(folds)

    gridWidth = -1
    gridHeight = -1
    for l in dots:
       gridWidth = max(gridWidth, int(l[0]) + 1)
       gridHeight = max(gridHeight, int(l[1]) + 1)

    print("width", gridWidth)
    print("height", gridHeight)


    startTime = time.time()

    # CODE
    grid = []
    for y in range(gridHeight):
        r = ""
        for x in range(gridWidth):
            c = '-'
            for d in dots:
                if(x == int(d[0]) and y == int(d[1])): 
                    c = '*'
            r += c
        grid.append(r)
        print(r, y) 
   
    print()

    # Execute folds
    for f in folds:
        print(f[0], f[1], "\n")
        foldline = int(f[1])
        if(f[0] == "y"):
            for i in range(1, gridHeight - foldline):
                lineOne = grid[foldline + i]
                lineTwo = grid[foldline - i]
                newLine = list(lineTwo)
                for j in range(len(lineTwo)):
                    if(lineTwo[j] == '*' or lineOne[j] == '*'): 
                        newLine[j] = '*'
                grid[foldline - i] = ''.join(newLine)
            grid = grid[:foldline]


        else:
            #TODO vertical fold
            print("TODO vertical fold")

        for l in grid:
            print(l)

    endTime = time.time()

    print()
    print("Took", (endTime - startTime) * 1000000, "us")

def puzzle2 (input):
    startTime = time.time()

    # CODE

    endTime = time.time()

    print()
    print("Took", (endTime - startTime) * 1000000, "us")
    

# RUN 
puzzle1(data)
#puzzle2(data)
