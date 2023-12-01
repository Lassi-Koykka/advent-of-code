#ifndef INCLUDE_UTILS

#define INCLUDE_UTILS

#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LSIZE 1028

static inline size_t read_line(char **line, FILE *stream) {
  char buffer[LSIZE];
  if (fgets(buffer, sizeof(buffer), stream) == NULL)
    return -1;

  unsigned int line_len = strlen(buffer);

  // Remove newline
  char last_char = buffer[line_len - 1];
  if (last_char == '\n') {
    last_char = '\0';
    line_len -= 1;
  }
  *line = (char *)malloc(line_len * sizeof(char));
  strcpy(*line, buffer);
  return line_len;
}

static inline size_t read_lines(char ***linesPtr, FILE *stream) {
  char **lines = NULL;
  char *line = NULL;
  unsigned int lineCount = 0;
  size_t lineLen = 0;
  while ((lineLen = read_line(&line, stream)) != -1) {
    lines = (char **)realloc(lines, (lineCount + 1) * sizeof(char *));
    assert(lines != NULL);
    lines[lineCount] = (char *)malloc((lineLen + 1) * sizeof(char));
    assert(lines[lineCount] != NULL);
    strcpy(lines[lineCount], line);
    lineCount++;
  }

  *linesPtr = lines;
  return lineCount;
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
