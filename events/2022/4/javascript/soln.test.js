const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const fns = require("./soln")

const EXAMPLE_INPUT = "2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8\n"
const EXAMPLE_OUTPUT = [2, null]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/4")
const PUZZLE_OUTPUT = [584, null]

describe("[2022/4]", () => {
  describe("examples", validateSolutions(fns, EXAMPLE_INPUT, ...EXAMPLE_OUTPUT))
  describe.skip("puzzle", validateSolutions(fns, PUZZLE_INPUT, ...PUZZLE_OUTPUT))
})