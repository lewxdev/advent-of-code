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
 * @param {{ [name: string]: (input: string) => any }} solutions - the soln.js `exports`
 * @param {string|string[]|Promise<string>} input - the input to provide to each function
 * @param {any[]} expected
 */
exports.validateSolutions = (solutions, input, ...expected) => () => {
  test.each(
    Object
      .entries(solutions)
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