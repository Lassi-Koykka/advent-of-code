package main

import (
	f "fmt"
	"io/ioutil"
	s "strings"
)

const TEST = 1;
const DAY = 1;

func check (err error) {
    if(err != nil) {
        println("ERROR:", err)
    }
}

func str (val any) string {
    return f.Sprint(val)
}

func toStrSlice (strs []string) []int {
    nums := []int{}
    for _, s := range strs {
        nums :
    }
}

func main() {
    fileName := str(DAY)
    if(TEST == 1) {
        fileName += "-test"
    }
    bytes, err := ioutil.ReadFile(fileName)
    c := string(bytes)
    check(err)


    lines := s.Split(c, "\n")

    // println(c)
    f.Println(lines)

}
