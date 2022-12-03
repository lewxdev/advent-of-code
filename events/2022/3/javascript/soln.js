// Find the challenge here: https://adventofcode.com/2022/day/3

/** @param {string} item */
const getItemValue = (item) =>
  item.charCodeAt() - (item.match(/^[A-Z]$/) ? 38 : 96)

/**
 * @param {string[]} setA
 * @param {string[]} setB
 * @returns {string[]}
 */
const getCommonItems = (setA, setB) => {
  const [greaterSet, lesserSet] = setA.length !== setB.length
    ? [setA, setB].sort((a, b) => b.length - a.length)
    : [setA, setB]

  return greaterSet.reduce((result, item) =>
    lesserSet.includes(item) && !result.includes(item)
      ? [...result, item]
      : result,
    []
  )
}


/** @param {string} input - the provided puzzle input string */
exports.rucksackReorganizationPart1 = (input) =>
  input.trim().split("\n").reduce((sum, rucksack) => {
    const items = rucksack.split("")
    const sliceIndex = rucksack.length / 2

    const compartmentA = items.slice(0, sliceIndex)
    const compartmentB = items.slice(sliceIndex)
    return getItemValue(getCommonItems(compartmentA, compartmentB).at(0)) + sum
  }, 0)

/** @param {string} input - the provided puzzle input string */
exports.rucksackReorganizationPart2 = (input) => {
  return input.trim().split("\n").reduce(
    /** @param {{ group: string[]; sum: number }} */
    ({ group, sum }, rucksack) => {
      group = [...group, rucksack]
      if (group.length < 3) return { group, sum }

      const [setA, setB, setC] = group.map((rucksack) => rucksack.split(""))
      const [item] = getCommonItems(getCommonItems(setA, setB), setC)
      return { group: [], sum: getItemValue(item) + sum }
    },
    { group: [], sum: 0 }
  ).sum
}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}