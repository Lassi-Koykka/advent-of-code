import {log} from "console"
import { getContent } from "./utils"

const CREATE_FILES = false
const DAY = __filename.split(".")[0]
const TEST = true

const input = getContent(TEST ? DAY + "-test.txt" : DAY + "-input.txt", CREATE_FILES)

const run = (data: string) => {
  return data
}

log()
log("1:", run(input))
log("2:", run(input))
