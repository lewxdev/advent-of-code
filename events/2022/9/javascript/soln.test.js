const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = [
  "R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2\n",
  "R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20\n"
]
const EXAMPLE_OUTPUT = [
  [13, 88],
  [1, 36]
]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/9")
const PUZZLE_OUTPUT = [6_271, 2_458]

describe("[2022/9]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})