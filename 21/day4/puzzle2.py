def MarkNumber(board: list[list[str]], row: int, col: int):
    newBoard = board.copy()
    newBoard[row][col] = "X"
    return newBoard

def CheckIfWon(board: list[list[str]], row: int, col: int):
    colNums = ""
    for r in board:
        colNums += r[col]
    rowNums = "".join(board[row])
    if rowNums == "XXXXX" or colNums == "XXXXX":
        return True
    else:
        return False

def CalculateResult(board: list[list[str]], winNum: int):
    sum = 0
    print()
    print("WINNER WINNER CHICKEN DINNER")
    for row in board:
        print(",".join(row))
        for num in row:
            if(num != "X"):
                sum += int(num)
    print()
    print(f"Sum: {sum}")
    print(f"Winning number: {winNum}")
    print(f"{sum} * {winNum} = {sum * int(winNum)}")
    print()

def CheckForWinners(n: str, numIdx: int):
    winningBoards = []
    for b in boards:
        for rowIdx, r in enumerate(b):
            try:
                colIdx = r.index(n)
                b = MarkNumber(b, rowIdx, colIdx)
                if numIdx >= 4:
                    if CheckIfWon(b, rowIdx, colIdx):
                        CalculateResult(b, n)
                        winningBoards.append(b) 
                        
                        
            except:
                print("", end="")
    return winningBoards

def DrawNumber(numbers: list[str], boards: list[list[list[str]]]):
    b = []
    while(len(boards) > 1):
        for numIdx, n in enumerate(numbers):
            winningBoards = CheckForWinners(n, numIdx)
            try:
                for b in winningBoards:
                    if len(boards) < 2:
                        CalculateResult(b, n)
                        return
                    boards.remove(b)
            except:
                print("", end="")




#main
f = open("input")

numbers = f.readline().split(",")
f.readline()
boardsStrings = f.read().split("\n\n");

# read boards
boards: list[list[list[str]]] = []
for s in boardsStrings: 
    b = []
    rowStrings = s.split("\n")
    for rs in rowStrings:
        row = rs.split()
        b.append(row)
    boards.append(b)

DrawNumber(numbers, boards)
            