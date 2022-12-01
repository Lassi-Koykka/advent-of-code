import time

#main
f = open("input")
fileContent = f.read()
fileLines = fileContent.split("\n")


numStrs = fileContent.replace("\n", ",").replace(" -> ", ",").split(",")

nums = []

for s in numStrs:
    nums.append(int(s))

n = max(nums) + 1

grid = []
row = [0] * n

# START TIME
startTime = time.time()

for i in range(n):
    grid.append(row.copy())

highPoints = 0

for s in fileLines:
    pointStrs = s.split(" -> ")
    p1Strs = pointStrs[0].split(",")
    p2Strs = pointStrs[1].split(",")

    x1 = int(p1Strs[0])
    y1 = int(p1Strs[1])
    x2 = int(p2Strs[0])
    y2 = int(p2Strs[1])

    if(x1 == x2 and y1 == y2):
         grid[y1][x1] += 1
         if(grid[y1][x1] == 2): highPoints += 1
    elif (x1 == x2):
        maxY = max(y1, y2)
        minY = min(y1, y2)
        for y in range(minY, maxY + 1):
           grid[y][x1] += 1
           if(grid[y][x1] == 2): highPoints += 1   
    elif ( y1 == y2):
        maxX = max(x1, x2)
        minX = min(x1, x2)
        for x in range(minX, maxX + 1):
            grid[y1][x] += 1
            if(grid[y1][x] == 2): highPoints += 1  

endTime = time.time()

print(highPoints)

print("Took", (endTime - startTime) * 1000000, "us")