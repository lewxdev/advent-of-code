// Find the challenge here: https://adventofcode.com/2022/day/6

/**
 * @param {number} delimiterLength - the length of the delimiter to search for
 * @returns {(input: string) => number} the respective solution function
 */
const getFirstDelimiterIndex = (delimiterLength) => (input) => {
  for (let endIndex = delimiterLength; endIndex < input.length; endIndex++) {
    const substring = input.slice(endIndex - delimiterLength, endIndex)

    if (new Set(substring).size === delimiterLength) return endIndex
  }
}

exports.tuningTroublePart1 = getFirstDelimiterIndex(4)

exports.tuningTroublePart2 = getFirstDelimiterIndex(14)


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}