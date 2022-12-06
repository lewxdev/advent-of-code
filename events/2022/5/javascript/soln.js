// Find the challenge here: https://adventofcode.com/2022/day/5

/**
 * @param {9000|9001} model - a supported crane model number
 * @returns {(input: string) => string} the respective solution function
 */
const craneProcedureExecution = (model) => (input) => {
  const [representation, procedure] = input.split("\n\n")

  /** @type {string[][]} */
  const stacks =
    representation
      .split("\n")
      .reverse()
      .reduce((result, line, lineIndex) => {
        if (lineIndex === 0)
          return Array.from(Array(Number(line.at(-2))), () => [])

        for (let crateIndex = 1; crateIndex < line.length; crateIndex += 4)
          if (line[crateIndex].match(/[A-Z]/))
            result[(crateIndex - 1) / 4].push(line[crateIndex])

        return result
      }, [])

  procedure.trim().split("\n").forEach((step) => {
    const [amount, from, to] = step.match(/\d+/g).map(Number)
    const selection = stacks[from - 1].splice(-amount, amount)

    stacks[to - 1].push(...(model === 9001 ? selection : selection.reverse()))
  })

  return stacks.reduce((result, stack) => result += stack.at(-1) ?? "", "")
}

exports.supplyStacksPart1 = craneProcedureExecution(9000)

exports.supplyStacksPart2 = craneProcedureExecution(9001)


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}