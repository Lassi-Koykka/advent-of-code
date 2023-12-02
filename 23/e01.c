#include "utils.h"
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

#define NUM "01"
#define BUFSIZE 1028

#define NUMS_LEN 9
char *NUMS[] = { "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};

int isNumeric(char c) {
  return (c >= '1' && c <= '9');
}

int parseNums(int *nums, char *s, int parseStrNums) {
  int numCount = 0;
  int sLen = strlen(s);
  for (int i = 0; i < sLen; i++) {
    if(isNumeric(s[i])) {
      nums[numCount] = s[i] - '0';
      numCount++;
    } else if(parseStrNums) {
      for(int j = 0; j < NUMS_LEN; j++ ) {
        if(strstr(&s[i], NUMS[j]) == &s[i]) {
          nums[numCount] = j + 1;
          numCount++;
        }
      }
    }
  }
  return numCount;
}

int parseLines(char **lines, size_t lineCount, int parseStrNums) {
  int result = 0;

  for(int i = 0; i < lineCount; i++) {
    int *nums = malloc(BUFSIZE * sizeof(char));
    int numCount = parseNums(nums, lines[i], parseStrNums);
    if(numCount > 0) {
      int num = nums[0] * 10 + nums[numCount - 1];
      result += num;
    }
    free(nums);
  }

  return result;
}

int main(int argc, char *argv[]) {
  char *filename = argc > 1 ? argv[1] : "e" NUM "-input.txt";
  char **lines = NULL;
  int lineCount = readLinesFromFile(filename, &lines);

  int result1 = parseLines(lines, lineCount, 0);
  int result2 = parseLines(lines, lineCount, 1);
  freeLines(lines, lineCount);

  printf("PART 1: %d\n", result1);
  printf("PART 2: %d\n", result2);

  return 0;
}
