values = [];

f = open("input", "r");

for val in f:
    values.append(int(val));


previous = values[0];
increases = 0;

for x in range(1, len(values)):
    if previous < values[x]:
        increases += 1;
    previous = values[x];

print(increases);