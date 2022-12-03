// Find the challenge here: https://adventofcode.com/2022/day/3

/** @param {string} input - the provided puzzle input string */
exports.rucksackReorganizationPart1 = (input) => {
  return input.trim().split("\n").reduce((result, rucksack) => {
    const sliceIndex = rucksack.length / 2
    const $c1 = rucksack.slice(0, sliceIndex)
    const $c2 = rucksack.slice(sliceIndex)

    for (const item of $c1.split("")) {
      if (!$c2.includes(item)) continue
      return (item.charCodeAt() - (item.match(/^[A-Z]$/) ? 38 : 96)) + result
    }
  }, 0)
}

/** @param {string} input - the provided puzzle input string */
exports.rucksackReorganizationPart2 = (input) => {}


if (require.main === module) {
  const testSolutions = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}