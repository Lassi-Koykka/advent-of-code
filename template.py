import time

# Setup here
f = open("input")
fileContent = f.read()
fileLines = fileContent.split("\n")

# START TIME
startTime = time.time()

# Code here

endTime = time.time()

#Print result here
print()

print("Took", (endTime - startTime) * 1000000, "us")
