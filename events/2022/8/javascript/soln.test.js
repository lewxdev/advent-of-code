const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = "30373\n25512\n65332\n33549\n35390\n"
const EXAMPLE_OUTPUT = [21, 8]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/8")
const PUZZLE_OUTPUT = [1_713, 268_464]

describe("[2022/8]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})