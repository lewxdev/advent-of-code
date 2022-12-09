const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = "R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2\n"
const EXAMPLE_OUTPUT = [13, null]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/9")
const PUZZLE_OUTPUT = [6271, null]

describe("[2022/9]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe.skip("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})