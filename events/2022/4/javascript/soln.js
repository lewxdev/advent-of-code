// Find the challenge here: https://adventofcode.com/2022/day/4

/** @param {string} sections */
const expand = (sections) => {
  const [start, end] = sections.split("-").map((section) => parseInt(section))
  const result = []

  for (let n = start; n <= end; n++) result.push(n)
  return result
}

/** @param {string} input - the provided puzzle input string */
exports.campCleanupPart1 = (input) => {
  return input.trim().split("\n").reduce((result, pairing) => {
    const [assignmentA, assignmentB] =
      pairing
        .split(",")
        .map(expand)
        .sort((a, b) => b.length - a.length)

    return assignmentB.every((section) => assignmentA.includes(section))
      ? ++result
      : result
  }, 0)
}

/** @param {string} input - the provided puzzle input string */
exports.campCleanupPart2 = (input) => {
  return input.trim().split("\n").reduce((result, pairing) => {
    const [assignmentA, assignmentB] =
      pairing
        .split(",")
        .map(expand)
        .sort((a, b) => b.length - a.length)

    return assignmentA.some((section) => assignmentB.includes(section))
      ? ++result
      : result
  }, 0)
}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}