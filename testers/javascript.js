/**
 * @typedef {(input: string) => any} Solution
 * @typedef {{ [name: string]: Solution }} NamedSolutions
 * @typedef {{
 * (namedSolutions: NamedSolutions, input: string|Promise<string>, expected: any[]) =>
 *  () => void;
 * (namedSolutions: NamedSolutions, input: string[], expected: any[][]) =>
 *  () => void;
 * }} ValidationFn
 */

/**
 * Dynamically retrieves the unique puzzle input from
 * [Advent of Code](https://adventofcode.com) via an authenticated HTTP request
 * @param {string} puzzleId - the puzzle ID or a string that contains it
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
 * Logs a list of solutions given the provided solutions
 * @param {string} puzzleId - the puzzle ID or a string that contains it
 * @param {Solution[]} solutions - an array of functions to test
 */
exports.testSolutions = async (puzzleId, solutions) => {
  const input = await this.getUniquePuzzleInput(puzzleId)
  solutions.forEach((solution, index) => {
    console.log(`Solution ${index + 1}:`, solution(input))
  })
}

/**
 * Provides a shorthand for validating solutions against expected results
 * @type {ValidationFn}
 * @param {NamedSolutions} namedSolutions - the soln.js `exports`
 * @param {string|string[]|Promise<string>} input - the input to provide to each function
 * @param {any[]|any[][]} expected - a list of expected results mapped to each function
 */
exports.validateSolutions = (namedSolutions, input, expected) => () => {
  test.each(
    Object
      .entries(namedSolutions)
      .flatMap(([solutionName, solution], solutionIndex) =>
        Array.isArray(input)
          ? input.map((inputValue, inputIndex) => ({
              expected: expected[solutionIndex][inputIndex],
              index: inputIndex + 1,
              inputValue,
              solution,
              solutionName,
            }))
          : {
              expected: expected[solutionIndex],
              index: solutionIndex + 1,
              inputValue: input,
              solution,
              solutionName,
            }
      )
  )(
    "$index: $solutionName(...) => $expected",
    async ({ expected, inputValue, solution }) => {
      expect(solution(await inputValue)).toBe(expected)
    }
  )
}