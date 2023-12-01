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

  for (int i = 0; i < lineCount; i++) {
    char *line = lines[i];
    fputs(line, stdout);
  }

  int part_1_result = 0;
  int part_2_result = 0;

  printf("PART 1: %d\n", part_1_result);
  printf("PART 2: %d\n", part_2_result);

  return 0;
}
