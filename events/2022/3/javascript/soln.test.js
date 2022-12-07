const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const solutions = require("./soln")

const EXAMPLE_INPUT = "vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw\n"
const EXAMPLE_OUTPUT = [157, 70]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/3")
const PUZZLE_OUTPUT = [7_863, 2_488]

describe("[2022/3]", () => {
  describe("examples", validateSolutions(solutions, EXAMPLE_INPUT, EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(solutions, PUZZLE_INPUT, PUZZLE_OUTPUT))
})