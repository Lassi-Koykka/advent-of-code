#include "utils.h"
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

#define TEST 1
#define NUM 01

int part_1(char **lines);

int part_2(char **lines);

int main(int argc, char *argv[]) {
  char *template = TEST ? "e%02d-test.txt" : "e%02d-input.txt";
  char filename[18];
  sprintf(filename, template, NUM);

  FILE *f = fopen(filename, "r");
  assert(f != NULL);

  char **lines = NULL;
  int lineCount = read_lines(&lines, f);
  assert(lines != NULL);
  fclose(f);

  int sumIdx = 0;
  int *sums = calloc(lineCount, sizeof(int));

  for (int i = 0; i < lineCount; i++) {
    char *line = lines[i];

    if (line[0] == '\n') {
      sumIdx += 1;
      continue;
    }
    int val = atoi(line);
    printf("%d: %d\n", sumIdx, val);
    sums[sumIdx] += val;
  }
  int sumCount = sumIdx + 1;

  sums = realloc(sums, sumCount * sizeof(int));

  qsort(sums, sumCount, sizeof(int), cmp_int_desc);
  printf("RESULTS:\n");

  int topThreeSum = 0;
  for (int i = 0; i < sumCount; i++) {
    if (i < 3) {
      topThreeSum += sums[i];
    }
    printf("%d: %d\n", i + 1, sums[i]);
  }

  printf("PART 1: %d\n", sums[0]);
  printf("PART 2: %d\n", topThreeSum);

  return 0;
}
