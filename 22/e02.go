package main

import (
	f "fmt"
	"io/ioutil"
	"sort"
	sc "strconv"
	ss "strings"
)


func check (err error) {
    if(err != nil) {
        println("ERROR:", err)
    }
}

func str (val any) string {
    return f.Sprint(val)
}

func toIntSlice (strs []string) []int {
    nums := []int{}
    for _, s := range strs {
        v, _ := sc.Atoi(s)
        nums = append(nums, v)
    }
    return nums;
}

func intSum (nums []int) int {
    sum := 0
    for _, n := range nums {
        sum += n
    }
    return sum
}

func sortInts (ints []int, reverse bool) []int {
        nums := append(ints)
        sort.Ints(nums)
        if(reverse) {
            sort.Sort(sort.Reverse(sort.IntSlice(nums)))
        } else {
            sort.Sort(sort.IntSlice(ints))
        }
        return nums
}

const DAY = 2;
const TEST = 1;


func main() {

    VALUES := map[string]int {
        "A": 1,
        "B": 2,
        "C": 3,
        "X": 1,
        "Y": 2,
        "Z": 3,
    }

    WINS := map[int]int {
        1: 3,
        2: 1,
        3: 2,
    }
    LOSES := map[int]int {
        3: 1,
        1: 2,
        2: 3,
    }

    fileName := "e0" + str(DAY) + "-input.txt"
    if(TEST == 1) {
        fileName = "e0" + str(DAY) + "-test.txt" 
    }
    bytes, err := ioutil.ReadFile(fileName)
    check(err)
    c := string(bytes)

    lines := ss.Split(ss.TrimSpace(c), "\n")
    sum := 0
    sum2 := 0
    for _, l := range(lines) {
        sides := ss.Split(l, " ")
        a := VALUES[sides[0]]
        b := VALUES[sides[1]]

        sum += b
        if (a == b) {
            sum += 3
        } else if(LOSES[a] == b) {
            sum += 6
        }

        sum2 += (b - 1) * 3

        if(b == 1) {
            sum2 += WINS[a]
        } else if (b == 2) {
            sum2 += a
        } else if (b == 3) {
            sum2 += LOSES[a]
        }

        println(a, b)
    }

    // f.Println(lines)
    f.Println("1:", sum)
    f.Println("2:", sum2)

}
