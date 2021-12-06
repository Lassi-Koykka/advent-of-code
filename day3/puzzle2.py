f = open("input")

oxygen = ""
scrubber = ""

length = 0

# Fill initial array
length = len(f.readline()) - 1

ones = [0] * length

values = f.read().splitlines();

oxygenVals = []
scrubberVals = []
for x in range(length + 1):
    for bits in values:
        if(bits.startswith(oxygen) or bits.startswith(scrubber))
            bit = bits[x]
            if bit == "1":
                ones[x] += 1

    if(ones[x] >= length / 2):
        oxygen += "1"
        scrubber += "0"
    else:
        scrubber += "1"
        oxygen += "0"

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

# print(f"Gamma: {gammaStr} {gamma}")
# print(f"Epsilon: {epsilonStr} {epsilon}")

print(f"Life support rating")