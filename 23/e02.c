#include "utils.h"

#define NUM "02"
#define BUFLEN 32
#define STRLEN 255
#define COLORS (char[]){'r', 'g', 'b'}

int isGamePossible(char *game) {
  char hands[BUFLEN][STRLEN] = {0};
  char *hand = strtok(game, ";");

  int handCount = 0;
  while(hand != NULL) {
    if(hand[0] == ' ') {
      hand++;
    }
    strcpy(hands[handCount], hand);
    handCount++;
    hand = strtok(NULL, ";");
  }

  for(int i = 0; i < handCount; i++) {
    char *color = strtok(hands[i], ",");
    while(color != NULL) {
      if(color[0] == ' ') {
        color++;
      }
      int count = 0;
      char name[STRLEN];
      sscanf(color, "%d %s", &count, name);
      char c = name[0];

      if ((c == 'r' && count > 12) || 
          (c == 'g' && count > 13) || 
          (c == 'b' && count > 14)) {
        return 0;
      }
      color = strtok(NULL, ",");
    }
  }
  return 1;
}

int part1(char **lines, size_t lineCount) {
  int result = 0;
  for (int i = 0; i < lineCount; i++) {
    char game[STRLEN];
    strcpy(game, strstr(lines[i], ": ") + 2); 
    if(isGamePossible(game)) {
      result += i + 1;
    }
  }
  return result;
}

int part2(char **lines, size_t lineCount) {
  int result = 0;
  for (int i = 0; i < lineCount; i++) {
    char game[STRLEN];
    strcpy(game, strstr(lines[i], ": ") + 2); 
    char *color = strtok(game, ",;");
    int mins[3] = { 0 };
    while(color != NULL) {
      if(color[0] == ' ') {
        color++;
      }
      int count = 0;
      char name[STRLEN];
      sscanf(color, "%d %s", &count, name);
      for(int j = 0; j < 3; j++) {
        if(COLORS[j] == name[0]) {
          mins[j] = max(mins[j], count);
        }
      }
      color = strtok(NULL, ",;");
    }
    int pow = 1;
    for(int j = 0; j < 3; j++) {
      if(mins[j] > 0) {
        pow *= mins[j];
      }
    }
    result += pow;
  }
  return result;
}

int main(int argc, char *argv[]) {
  char *filename = argc > 1 ? argv[1] : "e" NUM "-input.txt";

  char **lines = NULL;
  int lineCount = readLinesFromFile(filename, &lines);

  int result1 = part1(lines, lineCount);
  int result2 = part2(lines, lineCount);
  freeLines(lines, lineCount);

  printf("PART 1: %d\n", result1);
  printf("PART 2: %d\n", result2);

  return 0;
}
