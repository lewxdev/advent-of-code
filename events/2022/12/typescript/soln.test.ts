const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = "Sabqponm\nabcryxxl\naccszExk\nacctuvwj\nabdefghi\n"
const EXAMPLE_OUTPUT = [31, null]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/12")
const PUZZLE_OUTPUT = [null, null]

describe("[2022/12]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe.skip("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})