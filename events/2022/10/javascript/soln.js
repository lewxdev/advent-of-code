// Find the challenge here: https://adventofcode.com/2022/day/10

/**
 * @param {string} input
 * @param {(cycle: number, register: number) => void} callback
 */
const readInstructions = (input, callback) => {
  let [cycle, register] = [0, 1]
  const clockCircuit = (function* () {
    while (true) yield callback(++cycle, register)
  })()

  input.trim().split("\n").forEach((instruction) => {
    const addxMatch = instruction.match(/^addx\s(?<value>\-?\d+)$/)
    if (!addxMatch) return clockCircuit.next()

    clockCircuit.next()
    clockCircuit.next()
    register += parseInt(addxMatch.groups.value)
  })
}

/** @param {string} input - the provided puzzle input string */
exports.cathodeRayTubePart1 = (input) => {
  /** @type {[number, number][]} */
  const signals = []
  readInstructions(input, (cycle, register) => {
    if ((cycle - 20) % 40 === 0) signals.push(cycle * register)
  })

  return signals.slice(0, 6).reduce((sum, value) => sum + value)
}

/** @param {string} input - the provided puzzle input string */
exports.cathodeRayTubePart2 = (input) => {
  /** @type {string[]} */
  const screenPixels = Array(6).fill("")
  readInstructions(input, (cycle, register) => {
    const index = Math.floor((cycle - 1) / 40)
    screenPixels[index] +=
      [register - 1, register, register + 1]
        .some((value) => value === screenPixels[index].length)
        ? "#"
        : "."
  })

  return screenPixels.join("\n")
}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}