values = [];

f = open("inputtest", "r");

for val in f:
    values.append(int(val));


increases = 0;

for x in range(3, len(values)):
    previous = values[x-3] + values[x-2] + values[x-1];
    if previous < values[x-2] + values[x-1] + values[x]:
        increases += 1;
    previous = values[x];

print(increases);