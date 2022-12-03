// Find the challenge here: https://adventofcode.com/<eventYear>/day/<eventDay>

/** @param {string} input - the provided puzzle input string */
exports.<puzzleName | camelcase>Part1 = (input) => {}

/** @param {string} input - the provided puzzle input string */
exports.<puzzleName | camelcase>Part2 = (input) => {}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}