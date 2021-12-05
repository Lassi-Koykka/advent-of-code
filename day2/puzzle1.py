values = []

x = 0
y = 0

f = open("input")

for val in f:
    command = val.split();
    direction = command[0];
    amount = int(command[1]);

    if direction == "up":
        y -= amount;
    elif direction == "down":
        y += amount;    
    elif direction == "forward":
        x += amount;



print(x, y)
print(x * y)
    