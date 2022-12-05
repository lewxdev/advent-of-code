// Find the challenge here: https://adventofcode.com/2022/day/5

/** @param {string} input - the provided puzzle input string */
exports.supplyStacksPart1 = (input) => {
  const [initialVisual, procedure] = input.split("\n\n")

  /** @type {string[][]} */
  const stacks =
    initialVisual
      .split("\n")
      .reverse()
      .reduce(
        /** @param {string[][]} result */
        (result, line, i) => {
        if (i === 0) return [...Array(parseInt(line.at(-2)))].map(() => [])

        line.split("").forEach((char, j) => {
          if (char.match(/[A-Z]/)) result[(j - 1) / 4].push(char)
        })

        return result
      }, [])

  procedure.trim().split("\n").forEach((step) => {
    const [amount, from, to] = step.match(/\d+/g).map((match) => parseInt(match))
    const crates = stacks[from - 1].splice(-amount, amount).reverse()
    stacks[to - 1].push(...crates)
  })

  return stacks.reduce((result, stack) => result += stack.at(-1) ?? "", "")
}

/** @param {string} input - the provided puzzle input string */
exports.supplyStacksPart2 = (input) => {}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}