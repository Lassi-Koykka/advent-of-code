import time

test = 0

# Setup here
f = open("inputtest" if test else "input")
fileContent = f.read()
lines = fileContent.strip().split("\n")
data = [ l.split("-") for l in lines]

neighbours: dict[str,list[str]] = {}
for path in data:
    v1 = path[0]
    v2 = path[1]
    if(neighbours.get(v1, None) == None):
        neighbours[v1] = []
    if(neighbours.get(v2, None) == None):
        neighbours[v2] = []
    neighbours[v1].append(v2)
    neighbours[v2].append(v1)
            
def puzzle1 (input):
    paths = 0

    def searchPaths(visited, v):
        newPaths = 0
        currVisited = visited.copy()
        currVisited.append(v)
        for n in input[v]:
            if(n == "start"): continue
            elif(n == "end"): 
                newPaths += 1
                currVisited.append(n)
                #print(",".join(currVisited))
            elif(n == n.upper() or visited.count(n) < 1):
                newPaths += searchPaths(currVisited, n)

        return newPaths
    # ------------------

    startTime = time.time()
    
    # CODE
    for n in input["start"]:
        paths += searchPaths(["start"], n)

    endTime = time.time()

    print(paths)
    print("Took", (endTime - startTime) * 1000000, "us")

# Very slow. Could be way better.
def puzzle2 (input):
    paths = 0

    def searchPaths(visited, v, smallVisitedTwice):
        newPaths = 0
        currVisited = visited.copy()
        currVisited.append(v)

        svt = bool(smallVisitedTwice)
        if(svt == False):
            for v in currVisited:
                if(v == v.lower() and currVisited.count(v) > 1):
                    svt = True

        if(v == "end"):
                newPaths += 1
                #print(",".join(currVisited))
                return newPaths

        for n in input[v]:
            if(n == "start"): continue
            elif(n == n.upper() or (n not in currVisited) or (currVisited.count(n) < 2 and not svt)):
                newPaths += searchPaths(currVisited, n, svt)

        return newPaths
    # ------------------

    startTime = time.time()
    
    # CODE
    for n in input["start"]:
        paths += searchPaths(["start"], n, False)

    endTime = time.time()

    print(paths)
    print("Took", (endTime - startTime) * 1000000, "us")
    

# RUN 
#puzzle1(neighbours)
puzzle2(neighbours)
