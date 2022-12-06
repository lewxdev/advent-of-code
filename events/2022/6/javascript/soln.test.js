const { getUniquePuzzleInput, validateSolutions } = require("testers/javascript")
const fns = require("./soln")
const { tuningTroublePart1, tuningTroublePart2 } = fns

const EXAMPLE_INPUT = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
]
const EXAMPLE_OUTPUT = [
  [7, 5, 6, 10, 11],
  null
]

const PUZZLE_INPUT = getUniquePuzzleInput("2022/6")
const PUZZLE_OUTPUT = [null, null]

describe("[2022/6]", () => {
  describe("examples", () => {
    test.each(EXAMPLE_INPUT.map((input, index) => [input, EXAMPLE_OUTPUT[0][index]]))("tuningTroublePart1(%s) => %i", ([input, expected]) => {
      expect(tuningTroublePart1(input)).toBe(expected)
    })
  })

  describe.skip("puzzle", validateSolutions(fns, PUZZLE_INPUT, ...PUZZLE_OUTPUT))
})