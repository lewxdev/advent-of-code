const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const fns = require("./soln")

const EXAMPLE_INPUT = "vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw\n"
const EXAMPLE_OUTPUT = [157, 70]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/3")
const PUZZLE_OUTPUT = [7_863, 2_488]

describe("[2022/3]", () => {
  describe("examples", validateSolutions(fns, EXAMPLE_INPUT, ...EXAMPLE_OUTPUT))
  describe("puzzle", validateSolutions(fns, PUZZLE_INPUT, ...PUZZLE_OUTPUT))
})