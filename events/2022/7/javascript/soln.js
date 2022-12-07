// Find the challenge here: https://adventofcode.com/2022/day/7

const { join } = require("path")

const COMMAND_PATTERN = /^\$\s(?:cd\s(?<directory>.+)|ls)$/
const OUTPUT_PATTERN = /^(?:dir\s(?<directory>.+)|(?<filesize>\d+)\s(?<filename>.+))$/

/** @typedef {{ size: number; ".."?: string; }} Directory */

/** @type {{ [path: string]: Directory }} */
const files = { "/": { size: 0 } }

/**
 * @param {string} path
 * @param {(path: Directory) => void} callback
 */
const traverse = (path, callback) => {
  if (!path) return

  callback(files[path])
  traverse(files[path][".."], callback)
}

/** @param {string} input - the provided puzzle input string */
exports.noSpaceLeftOnDevicePart1 = (input) => {
  input.trim().split("\n").reduce(({ parent }, line) => {
    if (line.startsWith("$")) {
      const { directory } = line.match(COMMAND_PATTERN).groups
      return { parent: !directory ? parent : join(parent, directory) }
    }

    const { directory, filesize } = line.match(OUTPUT_PATTERN).groups

    if (directory) files[join(parent, directory)] = { size: 0, "..": parent }
    else traverse(parent, (path) => path.size += parseInt(filesize))
    return { parent }
  }, { parent: "/" })

  return Object.values(files).reduce((result, { size }) =>
    size <= 100_000 ? result += size : result, 0
  )
}

/** @param {string} input - the provided puzzle input string */
exports.noSpaceLeftOnDevicePart2 = (input) => {}

if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}