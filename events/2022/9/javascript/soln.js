// Find the challenge here: https://adventofcode.com/2022/day/9

/**
 * @param {number} numKnots
 * @returns {(input: string) => number}
 */
const getLastKnotUniqueMovements = (numKnots) => (input) => {
  const movements =
    input
      .trim()
      .split("\n")
      .map((motion) => {
        const { direction, steps } =
          motion.match(/^(?<direction>R|L|U|D)\s(?<steps>\d+)$/).groups
        return { direction, steps: parseInt(steps) }
      })
      .reduce((acc, { direction, steps }) =>
        [...Array(steps)].reduce((movementsRef) => {
          const [[prevLeadX, prevLeadY], ...prevTailPositions] = movementsRef.at(-1)
          return [...movementsRef, (
            prevTailPositions.reduce((result, [x1, y1]) => {
              const [x0, y0] = result.at(-1)
              const deltaX = x0 - x1
              const deltaY = y0 - y1

              return [...result, (
                [deltaX, deltaY].some((delta) => Math.abs(delta) > 1)
                  ? x0 === x1
                    ? [x1, y1 + (deltaY < -1 ? -1 : 1)]
                    : y0 === y1
                      ? [x1 + (deltaX < -1 ? -1 : 1), y1]
                      : [
                        deltaX < -1 ? x1 - 1 : deltaX > 1 ? x1 + 1 : x0,
                        deltaY < -1 ? y1 - 1 : deltaY > 1 ? y1 + 1 : y0
                      ]
                  : [x1, y1]
              )]
            }, [[
              prevLeadX + (direction === "L" ? -1 : direction === "R" ? 1 : 0),
              prevLeadY + (direction === "D" ? -1 : direction === "U" ? 1 : 0)
            ]]
            )
          )
          ]
        }, acc), [Array.from(Array(numKnots), () => [0, 0])])

  return new Set(movements.map((positions) => positions.at(-1).join())).size
}

/** @param {string} input - the provided puzzle input string */
exports.ropeBridgePart1 = getLastKnotUniqueMovements(2)

/** @param {string} input - the provided puzzle input string */
exports.ropeBridgePart2 = getLastKnotUniqueMovements(10)


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}