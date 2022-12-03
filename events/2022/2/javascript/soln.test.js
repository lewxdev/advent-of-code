const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const fns = require("./soln")

const EXAMPLE_INPUT = "A Y\nB X\nC Z\n"
const EXAMPLE_OUTPUT = [15, 12]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/2")
const PUZZLE_OUTPUT = [12_458, 12_683]

describe("[2022/2]", () => {
  describe("examples", validateSolutions(fns, EXAMPLE_INPUT, ...EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(fns, PUZZLE_INPUT, ...PUZZLE_OUTPUT))
})