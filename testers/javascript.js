/**
 * Dynamically retrieves the unique puzzle input from
 * [Advent of Code](https://adventofcode.com) via an authenticated HTTP request
 * @param {string} puzzleId - the puzzle ID or a delimited string including it
 * @returns {Promise<string>} the unique puzzle input string
 */
exports.getUniquePuzzleInput = (puzzleId) => {
  require("dotenv/config")

  const { SESSION_TOKEN } = process.env
  if (!SESSION_TOKEN) throw "Unable to retrieve SESSION_TOKEN"

  const pattern = /(?<event>\d{4})\/(?<day>\d+)/
  const { event, day } = puzzleId.match(pattern).groups

  return fetch(`https://adventofcode.com/${event}/day/${day}/input`, {
    headers: { cookie: `session=${SESSION_TOKEN}` }
  }).then((response) => response.text())
}

/**
 * Logs a list of solutions given the provided functions `fns`
 * @param {string} puzzleId - the puzzle ID or a delimited string including it
 * @param {((input: string) => any)[]} fns - an array of functions to test
 */
exports.testSolutions = async (puzzleId, fns) => {
  const input = await this.getUniquePuzzleInput(puzzleId)
  fns.forEach((fn, index) => {
    console.log(`Solution ${index + 1}:`, fn(input))
  })
}

/**
 * Provides a shorthand HOC for validating solutions against provided expected
 * results
 * @param {{ [name: string]: (input: string) => any }} fns - the soln.js `exports`
 * @param {Promise<string>|string} input - the input to provide to each function
 */
exports.validateSolutions = (fns, input, ...expected) => () => {
  beforeAll(async () => {
    input = await input
  })

  test.each(
    Object
      .entries(fns)
      .map(([name, fn], index) => ({ name, fn, expected: expected[index] }))
  )(
    "$name() => $expected",
    ({ fn, expected }) => {
      expect(fn(input)).toBe(expected)
    }
  )
}