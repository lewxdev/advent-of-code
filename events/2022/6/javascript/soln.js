// Find the challenge here: https://adventofcode.com/2022/day/6

/** @param {string} input - the provided puzzle input string */
exports.tuningTroublePart1 = (input) => {
  for (let endIndex = 4; endIndex < input.length; endIndex++)
    if (new Set(input.slice(endIndex - 4, endIndex)).size === 4)
      return endIndex
}

/** @param {string} input - the provided puzzle input string */
exports.tuningTroublePart2 = (input) => {}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}