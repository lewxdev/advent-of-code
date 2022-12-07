const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = "1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000\n"
const EXAMPLE_OUTPUT = [24_000, 45_000]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/1")
const PUZZLE_OUTPUT = [69_693, 200_945]

describe("[2022/3]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})