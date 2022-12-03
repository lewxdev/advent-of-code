const { rucksackReorganizationPart1, rucksackReorganizationPart2 } = require("./soln")
const EXAMPLE_INPUT = "vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw\n"

describe("2022/3", () => {
  test("rucksackReorganizationPart1()", () => {
    expect(rucksackReorganizationPart1(EXAMPLE_INPUT)).toBe(157)
  })

  test("rucksackReorganizationPart2()", () => {
    expect(rucksackReorganizationPart2(EXAMPLE_INPUT)).toBe(70)
  })
})