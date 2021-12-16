import time

# Setup here
f = open("input")
fileContent = f.read()

zeroFillDict = {}

for i in range(9):
    zeroFillDict[i] = 0

nums = zeroFillDict.copy()

days = 256
dueDay = 6
newFish = 8

for numStr in fileContent.split(","):
        nums[int(numStr)] += 1
    
# START TIME
startTime = time.time()

# Code here
for d in range(days + 1):
    tempNums = zeroFillDict.copy()
    x = 8
    while( x >= 0):
        val = 0
        if(nums.get(x)):
            val = nums[x]

        if(x != 0):
            tempNums[x-1] = val
        else:
            tempNums[8] = val
            tempNums[6] += val
        x -= 1
    nums = tempNums.copy()


sum = 0
for i in range(8):
    sum += nums[i]

endTime = time.time()

#Print result here
print(sum)

print("Took", (endTime - startTime) * 1000000, "us")
