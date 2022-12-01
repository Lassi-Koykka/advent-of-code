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

const DAY = 1;
const TEST = 0;

func main() {

    fileName := "e" + str(DAY) + "-input.txt"
    if(TEST == 1) {
        fileName = "e" + str(DAY) + "-test.txt" 
    }
    bytes, err := ioutil.ReadFile(fileName)
    check(err)
    c := string(bytes)

    parts := ss.Split(c, "\n\n")
    sums := []int{}
    for _, p := range parts {
        nums := toIntSlice(ss.Split(p, "\n"))
        sum := intSum(nums)
        sums = append(sums, sum)
    }

    sums = sortInts(sums, true)

    f.Println("1:", sums[0])
    f.Println("2:", intSum([]int{sums[0], sums[1], sums[2]}))

}
