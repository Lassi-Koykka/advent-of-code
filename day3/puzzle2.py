f = open("inputtest")

oxygenCrit = ""
scrubberCrit = ""


lines = f.read().splitlines();


def getValsStartingWith(x, vals):
    filteredVals = []
    for val in vals:
        if val.startswith(x):
            filteredVals.append(val)
    return filteredVals

ones = 0
for val in lines:
   if val.startswith("1"): 
       ones += 1

if(ones >= len(lines) / 2):
    oxygenCrit += "1"
    scrubberCrit += "0"
else:
    oxygenCrit += "0"
    scrubberCrit += "1"

oxygenVals = getValsStartingWith(oxygenCrit, lines)
scrubberVals = getValsStartingWith(scrubberCrit, lines)

while len(oxygenVals) > 1 or len(scrubberVals) > 1:

    if len(oxygenVals) > 1:
        ones = 0
        for val in oxygenVals:
            if val[len(oxygenCrit)] == "1":
                ones += 1
        if ones >= len(oxygenVals) / 2:
            oxygenCrit += "1"
        else:
            oxygenCrit += "0"

        oxygenVals = getValsStartingWith(oxygenCrit, oxygenVals)

    if len(scrubberVals) > 1:
        ones = 0
        for val in scrubberVals:
            if val[len(scrubberCrit)] == "1":
                ones += 1
        if ones >= len(scrubberVals) / 2:
            scrubberCrit += "0"
        else:
            scrubberCrit += "1"

        scrubberVals = getValsStartingWith(scrubberCrit, scrubberVals)


oxygen = int(oxygenVals[0], 2)
scrubber = int(scrubberVals[0], 2)

print(f"OXYGEN: {oxygen} {oxygenVals[0]}")

print(f"SCRUBBER: {scrubber} {scrubberVals[0]}")

# print(f"Gamma: {gammaStr} {gamma}")
# print(f"Epsilon: {epsilonStr} {epsilon}")

print(f"Life support rating {oxygen * scrubber}")