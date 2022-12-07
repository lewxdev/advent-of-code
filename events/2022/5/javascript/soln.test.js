const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = "    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 \n\nmove 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2\n"
const EXAMPLE_OUTPUT = ["CMZ", "MCD"]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/5")
const PUZZLE_OUTPUT = ["RNZLFZSJH", "CNSFCGJSM"]

describe("[2022/5]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})