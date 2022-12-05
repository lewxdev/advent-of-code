const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const fns = require("./soln")

const EXAMPLE_INPUT = "    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 \n\nmove 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2\n"
const EXAMPLE_OUTPUT = ["CMZ", "MCD"]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/5")
const PUZZLE_OUTPUT = ["RNZLFZSJH", "CNSFCGJSM"]

describe("[2022/5]", () => {
  describe("examples", validateSolutions(fns, EXAMPLE_INPUT, ...EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(fns, PUZZLE_INPUT, ...PUZZLE_OUTPUT))
})