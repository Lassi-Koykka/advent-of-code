import time

# Setup here
f = open("input")
fileContent = f.read()

nums = []

days = 80
dueDay = 6
newFish = 8

for numStr in fileContent.split(","):
    nums.append(int(numStr))


# START TIME
startTime = time.time()

# Code here
for d in range(days):
    x = len(nums) - 1
    while(x >= 0):
        if (nums[x] < 1):
            nums.append(newFish)
            nums[x] = dueDay
        else: nums[x] -= 1
        x -= 1

endTime = time.time()

#Print result here
print(len(nums))

print("Took", (endTime - startTime) * 1000000, "us")
