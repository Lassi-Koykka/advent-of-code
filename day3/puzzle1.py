f = open("input")

gammaStr = ""

length = 0

# Fill initial array
ones = [0] * (len(f.readline()) - 1)

for val in f:    
    length += 1
    bits = val
    for i, bit in enumerate(bits):
        if bit == "1":
            ones[i] += 1

for x in ones:
    if x > length / 2:
        gammaStr += "1"
    else:
        gammaStr += "0"

epsilonStr = ""

for bit in gammaStr:
    if bit == "1":
        epsilonStr += "0"
    else:
        epsilonStr += "1"

gamma = int(gammaStr, 2)
epsilon = int(epsilonStr, 2)

print(f"Gamma: {gammaStr} {gamma}")
print(f"Epsilon: {epsilonStr} {epsilon}")

print(f"Power consumption: ", gamma * epsilon)