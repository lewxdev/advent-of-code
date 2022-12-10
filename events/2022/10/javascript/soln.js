// Find the challenge here: https://adventofcode.com/2022/day/10

/** @param {string} input - the provided puzzle input string */
exports.cathodeRayTubePart1 = (input) => {
  /** @type {[number, number][]} */
  const signals = []

  let [cycle, register] = [0, 1]
  const clockCircuit = (function* () {
    while (true) {
      cycle++

      if ((cycle - 20) % 40 === 0) signals.push(cycle * register)
      yield cycle
    }
  })()

  input.trim().split("\n").forEach((instruction) => {
    const addxMatch = instruction.match(/^addx\s(?<value>\-?\d+)$/)
    if (!addxMatch) return clockCircuit.next()

    clockCircuit.next()
    clockCircuit.next()
    register += parseInt(addxMatch.groups.value)
  })

  return signals.slice(0, 6).reduce((sum, value) => sum + value)
}

/** @param {string} input - the provided puzzle input string */
exports.cathodeRayTubePart2 = (input) => {
  /** @type {string[]} */
  const screenPixels = Array(6).fill("")

  let [cycle, register] = [0, 1]
  const clockCircuit = (function* () {
    while (true) {
      const index = Math.floor(cycle / 40)
      cycle++

      screenPixels[index] +=
        [register - 1, register, register + 1]
          .some(
            (value) => (
              value >= 0 &&
              value < 40 &&
              value === screenPixels[index].length
            )
          )
          ? "#"
          : "."
      yield cycle
    }
  })()

  input.trim().split("\n").forEach((instruction) => {
    const addxMatch = instruction.match(/^addx\s(?<value>\-?\d+)$/)
    if (!addxMatch) return clockCircuit.next()

    clockCircuit.next()
    clockCircuit.next()
    register += parseInt(addxMatch.groups.value)
  })

  return screenPixels.join("\n")
}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}