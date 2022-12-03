const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const fns = require("./soln")

const EXAMPLE_INPUT = ""
const EXAMPLE_OUTPUT = [null, null]

const PUZZLE_INPUT = getUniquePuzzleInput("<eventYear>/<eventDay>")
const PUZZLE_OUTPUT = [null, null]

describe("[<eventYear>/<eventDay>]", () => {
  describe("examples", validateSolutions(fns, EXAMPLE_INPUT, ...EXAMPLE_OUTPUT))
  describe.skip("puzzle", validateSolutions(fns, PUZZLE_INPUT, ...PUZZLE_OUTPUT))
})