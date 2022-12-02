// https://adventofcode.com/<eventYear>/day/<eventDay>

const EXAMPLE_INPUT = ""
const EXAMPLE_OUTPUT = [null, null]

/**
 * Your unique puzzle input
 * @see {@link https://adventofcode.com/<eventYear>/day/<eventDay>/input}
 */
const puzzleInput = ""

/** @param {string} input */
const <puzzleName | camelcase>Part1 = (input) => {}

/** @param {string} input */
const <puzzleName | camelcase>Part2 = (input) => {}

//#region
const runTests = (() => {
  const $p = (result) => result === true ? "PASS" : "FAIL"

  // PART 1
  console.log(`example (1): ${$p(<puzzleName | camelcase>Part1(EXAMPLE_INPUT) === EXAMPLE_OUTPUT[0])}`)
  console.log(`solution (1): ${<puzzleName | camelcase>Part1(puzzleInput)}`)

  // PART 2
  console.log(`example (2): ${$p(<puzzleName | camelcase>Part2(EXAMPLE_INPUT) === EXAMPLE_OUTPUT[1])}`)
  console.log(`solution (2): ${<puzzleName | camelcase>Part2(puzzleInput)}`)
})()
//#endregion