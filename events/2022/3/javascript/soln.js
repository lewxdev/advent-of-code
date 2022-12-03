// Find the challenge here: https://adventofcode.com/2022/day/3

/** @param {string} input - the provided puzzle input string */
exports.rucksackReorganizationPart1 = (input) => {
  return input.trim().split("\n").reduce((sum, rucksack) => {
    const sliceIndex = rucksack.length / 2
    const $c1 = rucksack.slice(0, sliceIndex)
    const $c2 = rucksack.slice(sliceIndex)

    for (const item of $c1.split("")) {
      if (!$c2.includes(item)) continue
      return item.charCodeAt() - (item.match(/^[A-Z]$/) ? 38 : 96) + sum
    }
  }, 0)
}

/** @param {string} input - the provided puzzle input string */
exports.rucksackReorganizationPart2 = (input) => {
  /** @type {string[][]} */
  const groups = input.trim().split("\n").reduce((result, rucksack, index) => {
    if (index % 3 === 0) return [...result, [rucksack]]

    result[Math.floor(index / 3)].push(rucksack)
    return result
  }, [])

  /**
   * @param {string[]} $a
   * @param {string[]} $b
   * @returns {string[]}
   */
  const getCommonItems = ($a, $b) => {
    const [$1, $2] = [$a, $b].sort((a, b) => b.length - a.length)
    return $1.reduce((result, item) =>
      $2.includes(item) && !result.includes(item)
        ? [...result, item]
        : result,
      []
    )
  }

  return groups.reduce((sum, group) => {
    const [$r1, $r2, $r3] = group.map((rucksack) => rucksack.split(""))

    const [item] = getCommonItems(getCommonItems($r1, $r2), $r3)
    return item.charCodeAt() - (item.match(/^[A-Z]$/) ? 38 : 96) + sum
  }, 0)
}


if (require.main === module) {
  const testSolutions = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}