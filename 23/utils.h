#ifndef INCLUDE_UTILS

#define INCLUDE_UTILS

#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINES 10000
#define LSIZE 512

// FILE READING
static inline int readLinesFromFile(const char *filename, char ***lines) {
    FILE *file = fopen(filename, "r");
    assert(file && "Error opening file");

    *lines = (char **)malloc(MAX_LINES * sizeof(char *));
    assert(*lines && "Memory allocation error");

    int lineCount = 0;
    char buffer[LSIZE];

    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        // Remove the newline character if present
        size_t length = strlen(buffer);
        if (length > 0 && buffer[length - 1] == '\n') {
            buffer[length - 1] = '\0';
        }
        // Copy from buffer to lines
        (*lines)[lineCount] = (char *)malloc((length + 1) * sizeof(char));
        assert((*lines)[lineCount] && "Memory allocation error");
        strcpy((*lines)[lineCount], buffer);

        lineCount++;

        if (lineCount >= MAX_LINES) {
          fclose(file);
          assert(1 == 0 && "Max file lines limit reached");
        }
    }

    fclose(file);
    return lineCount;
}

static inline void freeLines(char **lines, int linesCount) {
  for (int i = 0; i < linesCount; i++) {
    free(lines[i]);
  }
  free(lines);
}

// LOGGING
static inline void printArray(int *a, int len) {
  printf("[ ");
  for (int i = 0; i < len; i++)
    printf("%d, ", a[i]);
  printf("]\n");
}

static inline void printCharArray(char *a, int len) {
  printf("[ ");
  for (int i = 0; i < len; i++)
    printf("%c, ", a[i]);
  printf("]\n");
}

// MATH
#define min(x, y) (x < y ? x : y)
#define max(x, y) (x > y ? x : y)
#define sig(x) (x > 0 ? 1 : x < 0 ? -1 : 0)

// COMPARING
static inline int cmp_int_asc(const void *aPtr, const void *bPtr) {
  int a = *(int *)aPtr;
  int b = *(int *)bPtr;
  if (a > b)
    return 1;
  else if (a < b)
    return -1;
  return 0;
}

static inline int cmp_int_desc(const void *aPtr, const void *bPtr) {
  int a = *(int *)aPtr;
  int b = *(int *)bPtr;
  if (a > b)
    return -1;
  else if (a < b)
    return 1;
  return 0;
}

#endif
