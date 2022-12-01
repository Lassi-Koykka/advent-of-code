import time

test = 0

# Setup here
f = open("inputtest" if test else "input")
fileContent = f.read()
data = fileContent.strip().split("\n")

closings = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
}

pointsOne = {
    ')': 3, 
    ']': 57, 
    '}': 1197, 
    '>': 25137, 
}

pointsTwo = {
    ')': 1, 
    ']': 2, 
    '}': 3, 
    '>': 4, 
}

def puzzle1 (input):
    startTime = time.time()
    result = 0
    # CODE
    remainingLines = input.copy()

    endTime = time.time()
    for l in input:
        openingList = []
        for c in l:
           if(c in "{[(<"): openingList.append(c)
           else: 
               if(c != closings[openingList.pop()]):
                   result += pointsOne[c]
                   remainingLines.remove(l)
                   break

    print(result)
    print("Took", (endTime - startTime) * 1000000, "us")
    
    return remainingLines

def puzzle2 (input):

    startTime = time.time()

    allScores = []

    # CODE
    for l in input:
        score = 0
        openingList = []
        for c in l:
           if(c in "{[(<"): openingList.append(c)
           else: openingList.pop()

        openingList.reverse()

        for c in openingList:
            score *= 5
            score += pointsTwo[closings[c]]

        allScores.append(score)


    allScores.sort()
    winner = allScores[round((len(allScores) - 0.5) / 2)]         

    

    endTime = time.time()

    print(winner)
    print("Took", (endTime - startTime) * 1000000, "us")
    

# RUN 
remainingLines = puzzle1(data)
puzzle2(remainingLines)
