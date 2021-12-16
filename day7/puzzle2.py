import time

# Setup here
f = open("input")
fileContent = f.read()
nums = []

for s in fileContent.split(","):
    nums.append(int(s))

nums.sort()
    
startTime = time.time()
# --- Code here ---
best = -1
for p in range(max(nums)):
    total = 0
    for x in nums:
        diff = abs(x - p)
        total += (diff * (diff + 1)) / 2
        if(best != -1 and total > best): break;
    if total < best or best == -1: best = total

endTime = time.time()

#Print result here
print(best)
print("Took", (endTime - startTime) * 1000000, "us")
