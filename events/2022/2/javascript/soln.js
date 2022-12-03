// Find the challenge here: https://adventofcode.com/2022/day/2

/**
 * @param {string} input
 * @param {RegExp[]} key
 */
const getTotalScore = (input, key) =>
  input.trim().split("\n").reduce((sum, strategy) =>
    sum + key.findIndex((pattern) => strategy.match(pattern)) + 1, 0)

/** @param {string} input */
exports.rockPaperScissorsPart1 = (input) => {
  const key = [/B X/, /C Y/, /A Z/, /A X/, /B Y/, /C Z/, /C X/, /A Y/, /B Z/]
  return getTotalScore(input, key)
}

/** @param {string} input */
exports.rockPaperScissorsPart2 = (input) => {
  const key = [/B X/, /C X/, /A X/, /A Y/, /B Y/, /C Y/, /C Z/, /A Z/, /B Z/]
  return getTotalScore(input, key)
}

if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}