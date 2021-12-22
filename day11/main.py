import time

test = 0

# Setup here
f = open("inputtest" if test else "input")
fileContent = f.read()
lines = fileContent.strip().split("\n")
data = []
for l in lines:
    data.append([int(c) for c in l])

def puzzle1 (input):

    X = input.copy()

    def increment(row, col):
        newFlashes = 0
        if(X[row][col] + 1 < 10):
            X[row][col] += 1
        elif(X[row][col] + 1 == 10):
            X[row][col] += 1
            newFlashes += 1

            for i in range(3):
                for j in range(3):
                    r = row - 1 + i
                    c = col - 1 + j
                    if(not (r < 0 or c < 0 or r > 9 or c > 9)):
                        newFlashes += increment(r, c)
            
        return newFlashes
    # ----------------------
    

    rows = len(X)
    cols = len(X[0])

    startTime = time.time()

    flashes = 0
    # CODE
    for i in range(100):
        for row in range(rows):
            for col in range(cols):
                flashes += increment(row, col)

        for row in range(rows):
            for col in range(cols):
                if(X[row][col] > 9): X[row][col] = 0

                

    endTime = time.time()

    print(flashes)
    print("Took", (endTime - startTime) * 1000000, "us")

def puzzle2 (input):
    
    X = input.copy()

    def increment(row, col):
        newFlashes = 0
        if(X[row][col] + 1 < 10):
            X[row][col] += 1
        elif(X[row][col] + 1 == 10):
            X[row][col] += 1
            newFlashes += 1

            for i in range(3):
                for j in range(3):
                    r = row - 1 + i
                    c = col - 1 + j
                    if(not (r < 0 or c < 0 or r > 9 or c > 9)):
                        newFlashes += increment(r, c)
            
        return newFlashes
    # ----------------------


    rows = len(X)
    cols = len(X[0])

    startTime = time.time()

    # CODE
    i = 1
    while(True):
        flashes = 0
        for row in range(rows):
            for col in range(cols):
                flashes = increment(row, col)
                if(flashes == rows * cols): 
                    print(i)
                    endTime = time.time()
                    print("Took", (endTime - startTime) * 1000000, "us")
                    return;

        for row in range(rows):
            for col in range(cols):
                if(X[row][col] > 9): X[row][col] = 0
    
        i += 1
    

# RUN 
#puzzle1(data)
puzzle2(data)
