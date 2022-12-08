// Find the challenge here: https://adventofcode.com/2022/day/8

/** @param {string} input - the provided puzzle input string */
const buildHeightMap = (input) =>
  input
    .trim()
    .split("\n")
    .reduce(
      /** @param {number[][]} result */
      (result, row) => [...result, Array.from(row.split(""), Number)], []
    )

/**
 * @param {number[][]} heightMap
 * @param {"left" | "right" | "up" | "down"} direction
 * @param {number} initialY
 * @param {number} initialX
 */
const getHeightMapSlice = (heightMap, direction, initialY, initialX) => {
  switch (direction) {
    case "left":
      return heightMap[initialY].slice(0, initialX).reverse()
    case "right":
      return heightMap[initialY].slice(initialX + 1)
    case "up":
      return heightMap
        .slice(0, initialY)
        .reverse()
        .reduce((result, row) => [...result, row[initialX]], [])
    case "down":
      return heightMap
        .slice(initialY + 1)
        .reduce((result, row) => [...result, row[initialX]], [])
    default:
      throw `Invalid direction argument: "${direction}"`
  }
}

/**
 * @param {number[][]} heightMap
 * @param {number} y
 * @param {number} x
 */
const getTreeVisibility = (heightMap, y, x) =>
  !!["up", "left", "right", "down"].find((direction) =>
    getHeightMapSlice(heightMap, direction, y, x)
      .every((height) => height < heightMap[y][x])
  )

/**
 * @param {number[][]} heightMap
 * @param {number} y
 * @param {number} x
 */
const getScenicScore = (heightMap, y, x) =>
  ["up", "left", "right", "down"]
    .map((direction) => {
      let viewDistance = 0
      for (const height of getHeightMapSlice(heightMap, direction, y, x))
        if (height < heightMap[y][x]) viewDistance++
        else return ++viewDistance

      return viewDistance
    })
    .reduce((acc, viewDistance) => acc * viewDistance)

/** @param {string} input - the provided puzzle input string */
exports.treetopTreeHousePart1 = (input) => {
  const heightMap = buildHeightMap(input)
  const boundY = heightMap.length
  const boundX = heightMap[0].length

  // Assume all trees on perimeter are visible
  let visibilityCount = ((boundY - 2) * 2) + (boundX * 2)

  for (let y = 1; y < boundY - 1; y++)
    for (let x = 1; x < boundX - 1; x++)
      if (getTreeVisibility(heightMap, y, x)) visibilityCount++

  return visibilityCount
}

/** @param {string} input - the provided puzzle input string */
exports.treetopTreeHousePart2 = (input) => {
  const heightMap = buildHeightMap(input)
  const boundY = heightMap.length
  const boundX = heightMap[0].length

  const scores = []

  for (let y = 1; y < boundY - 1; y++)
    for (let x = 1; x < boundX - 1; x++)
      scores.push(getScenicScore(heightMap, y, x))

  return scores.sort((a, b) => b - a).at(0)
}


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}