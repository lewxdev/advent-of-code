// Find the challenge here: https://adventofcode.com/2022/day/8

/** @param {string} input - the provided puzzle input string */
exports.treetopTreeHousePart1 = (input) => {
  const matrix =
    input
      .trim()
      .split("\n")
      .reduce(
        /** @param {number[][]} result */
        (result, row) => [...result, row.split("").map((v) => parseInt(v))], []
      )

  const numRows = matrix.length
  const numCols = matrix[0].length

  // Assume all trees on perimeter are visible
  let visibilityCount = ((numRows - 2) * 2) + (numCols * 2)

  for (let rowIndex = 1; rowIndex < numRows - 1; rowIndex++)
    innerLoop:
    for (let colIndex = 1; colIndex < numCols - 1; colIndex++) {
      const tree = matrix[rowIndex][colIndex]
      /** @param {number[]} array */
      const getIsVisible = (array) => array.every((height) => height < tree)

      const leftmostTrees = matrix[rowIndex].slice(0, colIndex)

      if (getIsVisible(leftmostTrees)) {
        visibilityCount++
        continue innerLoop
      }

      const rightmostTrees = matrix[rowIndex].slice(colIndex + 1)

      if (getIsVisible(rightmostTrees)) {
        visibilityCount++
        continue innerLoop
      }

      const uppermostTrees =
        matrix
          .slice(0, rowIndex)
          .reduce((result, row) => [...result, row[colIndex]], [])

      if (getIsVisible(uppermostTrees)) {
        visibilityCount++
        continue innerLoop
      }

      const lowermostTrees =
        matrix
          .slice(rowIndex + 1)
          .reduce((result, row) => [...result, row[colIndex]], [])

      if (getIsVisible(lowermostTrees)) {
        visibilityCount++
        continue innerLoop
      }
    }

  return visibilityCount
}

/** @param {string} input - the provided puzzle input string */
exports.treetopTreeHousePart2 = (input) => null


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}