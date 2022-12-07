// Find the challenge here: https://adventofcode.com/2022/day/7

/** @typedef {{ size: number; ".."?: string; }} Directory */

/** @param {string} input */
const getFilePaths = (input) => {
  const { join } = require("path")

  const COMMAND_PATTERN = /^\$\s(?:cd\s(?<directory>.+)|ls)$/
  const OUTPUT_PATTERN = /^(?:dir\s(?<directory>.+)|(?<fileSize>\d+)\s.+)$/

  /** @type {{ [path: string]: Directory }} */
  const filePaths = { "/": { size: 0 } }

  /**
   * @param {string=} path
   * @param {(path: Directory) => void} callback
   */
  const traverse = (path, callback) => {
    if (!path) return

    callback(filePaths[path])
    traverse(filePaths[path][".."], callback)
  }

  input.trim().split("\n").reduce(({ parent }, line) => {
    if (line.startsWith("$")) {
      const { directory } = line.match(COMMAND_PATTERN).groups
      return { parent: !directory ? parent : join(parent, directory) }
    }

    const { directory, fileSize } = line.match(OUTPUT_PATTERN).groups

    if (directory)
      filePaths[join(parent, directory)] = { size: 0, "..": parent }
    else traverse(parent, (path) => path.size += parseInt(fileSize))

    return { parent }
  }, { parent: "/" })

  return filePaths
}

/** @param {string} input - the provided puzzle input string */
exports.noSpaceLeftOnDevicePart1 = (input) =>
  Object.values(getFilePaths(input)).reduce((result, { size }) =>
    size <= 100_000 ? result += size : result, 0
  )

/** @param {string} input - the provided puzzle input string */
exports.noSpaceLeftOnDevicePart2 = (input) => {
  const filePaths = getFilePaths(input)
  const minFileSize = 30_000_000 - (70_000_000 - filePaths["/"].size)

  return Object
    .values(filePaths)
    .sort((a, b) => a.size - b.size)
    .find(({ size }) => size >= minFileSize)
    .size
}

if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}