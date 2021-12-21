import time

test = 0


# Setup here
f = open("inputtest" if test else "input")
fileContent = f.read()
lines = fileContent.strip().split("\n")
nums = [] 

for l in lines:
    nums.append([int(x) for x in l])


def puzzle1 (input):
    startTime = time.time()
    lowest = []
    # CODE 
    for row, l in enumerate(input):
        for col, x in enumerate(l):
            if(row > 0 and x > input[row - 1][col] <= x):
                continue
            if(row < len(input) - 1 and input[row + 1][col] <= x):
                continue
            if((col > 0 and l[col - 1] <= x) or (col < len(l) - 1 and l[col + 1] <= x)):
                continue

            lowest.append(x)

    endTime = time.time()

    print(sum(lowest) + len(lowest))
    print("Took", (endTime - startTime) * 1000000, "us")


def puzzle2 (input):
    startTime = time.time()
    
    X = input.copy()

    basins = [0] * 3

    def recSearchBasin(row, col, movedFrom):
        x = X[row][col]
        #print("Moved from:", movedFrom, "Number:", x)

        result = 0
        # Check left
        if(col > 0 and movedFrom != "l" and X[row][col - 1] > x and X[row][col - 1] < 9):
            result += 1
            result += recSearchBasin(row, col - 1, "r")
        # Check right
        if(col < len(X[0]) - 1 and movedFrom != "r" and X[row][col + 1] > x and X[row][col + 1] < 9):
            result += 1
            result += recSearchBasin(row, col + 1, "l")
        # Check up
        if(row > 0 and movedFrom != "u" and X[row - 1][col] > x and X[row - 1][col] < 9):
            result += 1
            result += recSearchBasin(row - 1, col, "d")
        # Check down
        if(row < len(X) - 1 and movedFrom != "d" and X[row + 1][col] > x and X[row + 1][col] < 9):
            result += 1
            result += recSearchBasin(row + 1, col, "u")
        X[row][col] = 9
        return result

    # CODE 
    for row, l in enumerate(input):
        for col, x in enumerate(l):
            if(row > 0 and x > input[row - 1][col] <= x):
                continue
            if(row < len(input) - 1 and input[row + 1][col] <= x):
                continue
            if((col > 0 and l[col - 1] <= x) or (col < len(l) - 1 and l[col + 1] <= x)):
                continue
            print("Searching basin at row ",row,"col",col)
            print("Start number", x)
            currBasin = recSearchBasin(row, col, "") + 1
            print("LENGTH:",currBasin, end="\n\n")
            for i in range(3):
                if(basins[i] < currBasin): 
                    basins[i] = currBasin
                    basins.sort()
                    break

    endTime = time.time()
    result = 1
    for b in basins:
        result *= b

    print(result)
    print("Took", (endTime - startTime) * 1000000, "us")



# RUN 
# puzzle1(nums)
puzzle2(nums)
