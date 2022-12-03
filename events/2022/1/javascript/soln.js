// Find the challenge here: https://adventofcode.com/2022/day/1

/** @param {string} input - the provided puzzle input string */
exports.calorieCountingPart1 = (input) =>
  Math.max(
    ...input
      .trim()
      .split("\n\n")
      .map((result) =>
        result
          .split("\n")
          .map((value) => parseInt(value))
          .reduce((sum, value) => sum + value)
        )
  )

/** @param {string} input - the provided puzzle input string */
exports.calorieCountingPart2 = (input) =>
  input
    .trim()
    .split("\n\n")
    .map((result) =>
      result
        .split("\n")
        .map((value) => parseInt(value))
        .reduce((sum, value) => sum + value)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, value) => sum + value)


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}