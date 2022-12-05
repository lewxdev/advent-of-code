// Find the challenge here: https://adventofcode.com/2022/day/5

/**
 * @param {9000|9001} model
 * @returns {(input: string) => string}
 */
const craneProcedureExecution = (model) => (input) => {
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
    const crates = stacks[from - 1].splice(-amount, amount)
    stacks[to - 1].push(...(model === 9001 ? crates : crates.reverse()))
  })

  return stacks.reduce((result, stack) => result += stack.at(-1) ?? "", "")
}

/** @param {string} input - the provided puzzle input string */
exports.supplyStacksPart1 = craneProcedureExecution(9000)

/** @param {string} input - the provided puzzle input string */
exports.supplyStacksPart2 = craneProcedureExecution(9001)


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}