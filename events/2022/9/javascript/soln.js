// Find the challenge here: https://adventofcode.com/2022/day/9

/** @typedef {[x: number, y: number]} Position */

/** @param {string} input - the provided puzzle input string */
exports.ropeBridgePart1 = (input) => {
  /** @type {{ direction: "L" | "R" | "U" | "D"; steps: number }[]} */
  const motions =
    input
      .trim()
      .split("\n")
      .map((motion) => {
        const { direction, steps } =
          motion.match(/^(?<direction>R|L|U|D)\s(?<steps>\d+)$/).groups
        return { direction, steps: parseInt(steps) }
      })

  /**
   * @param {Position} headPos
   * @param {Position} prevTailPos
   * @return {Position}
   */
  const getTailPosition = ([headX, headY], [prevTailX, prevTailY]) =>
    Math.abs(headX - prevTailX) > 1 || Math.abs(headY - prevTailY) > 1
      ? positions.at(-1).head
      : [prevTailX, prevTailY]

  /** @type {{ head: Position; tail: Position }[]} */
  const positions = [{ head: [0, 0], tail: [0, 0] }]

  motions.forEach(({ direction, steps }) => {
    for (let _ = 0; _ < steps; _++) {
      const { head: [prevHeadX, prevHeadY], tail: prevTailPos } =
        positions.at(-1)

      /** @type {Position} */
      const headPos = [
        prevHeadX + (direction === "L" ? -1 : direction === "R" ? 1 : 0),
        prevHeadY + (direction === "D" ? -1 : direction === "U" ? 1 : 0)
      ]

      positions.push({
        head: headPos,
        tail: getTailPosition(headPos, prevTailPos)
      })
    }
  })

  return new Set(positions.map(({ tail }) => `(${tail.join()})`)).size
}

/** @param {string} input - the provided puzzle input string */
exports.ropeBridgePart2 = (input) => {}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}