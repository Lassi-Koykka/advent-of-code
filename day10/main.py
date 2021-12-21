import time

test = 1

# Setup here
f = open("inputtest" if test else "input")
fileContent = f.read()
data = fileContent.strip().split(",")

def puzzle1 (input):
    startTime = time.time()

    # CODE

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
