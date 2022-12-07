const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = ""
const EXAMPLE_OUTPUT = [null, null]

const PUZZLE_INPUT = getUniquePuzzleInput("<eventYear>/<eventDay>")
const PUZZLE_OUTPUT = [null, null]

describe("[<eventYear>/<eventDay>]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe.skip("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})