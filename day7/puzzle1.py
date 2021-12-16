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

medianPos = round(len(nums) / 2)
focus = nums[medianPos]

total = 0
for x in nums:
    total += abs(focus - x)

endTime = time.time()

#Print result here
print(total)

print("Took", (endTime - startTime) * 1000000, "us")
