values = []

x = 0
y = 0
aim = 0

f = open("input")

for val in f:
    command = val.split();
    direction = command[0];
    amount = int(command[1]);

    if direction == "up":
        aim -= amount;
    elif direction == "down":
        aim += amount;    
    elif direction == "forward":
        x += amount;
        y += aim * amount;
        


print(x, y)
print(x * y)
    