// Find the challenge here: https://adventofcode.com/2022/day/4

/** @param {"some"|"every"} method */
const determineOverlaps = (method) =>
  /** @param {string} input */
  (input) =>
    input.trim().split("\n").reduce((result, pairing) => {
      const [assignmentA, assignmentB] =
        pairing
          .split(",")
          .map((sections) => {
            const result = []
            const [start, end] =
              sections.split("-").map((section) => parseInt(section))

            for (let n = start; n <= end; n++) result.push(n)
            return result
          })
          .sort((a, b) => b.length - a.length)

      return assignmentB[method]((section) => assignmentA.includes(section))
        ? ++result
        : result
    }, 0)


/** @param {string} input - the provided puzzle input string */
exports.campCleanupPart1 = determineOverlaps("every")

/** @param {string} input - the provided puzzle input string */
exports.campCleanupPart2 = determineOverlaps("some")


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}