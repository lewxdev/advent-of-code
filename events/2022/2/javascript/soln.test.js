const { rockPaperScissorsPart1, rockPaperScissorsPart2 } = require("./soln")
const EXAMPLE_INPUT = "A Y\nB X\nC Z"

describe("[2022/2]", () => {
  test("rockPaperScissorsPart1()", () => {
    expect(rockPaperScissorsPart1(EXAMPLE_INPUT)).toBe(15)
  })

  test("rockPaperScissorsPart2()", () => {
    expect(rockPaperScissorsPart2(EXAMPLE_INPUT)).toBe(12)
  })
})