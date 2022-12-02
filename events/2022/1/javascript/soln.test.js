const { calorieCountingPart1, calorieCountingPart2 } = require("./soln")
const EXAMPLE_INPUT = "1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000"

describe("[2022/1]", () => {
  test("calorieCountingPart1()", () => {
    expect(calorieCountingPart1(EXAMPLE_INPUT)).toBe(24_000)
  })

  test("calorieCountingPart2()", () => {
    expect(calorieCountingPart2(EXAMPLE_INPUT)).toBe(45_000)
  })
})