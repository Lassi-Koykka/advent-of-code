import {readFileSync} from "fs";

const TEST = true

const num = __filename.split(".")[0]
const inputFileName = TEST ? num + "-test" : num + ""

const content = readFileSync(inputFileName).toString()

