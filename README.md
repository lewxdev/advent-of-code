# Advent of Code #
My personal, multi-event solutions for the annual series of programming
challenges known as [Advent of Code](https://adventofcode.com/about).
Currently competing on leaderboards for
[IndyHackers](https://www.indyhackers.org) and [Smarty](https://www.smarty.com/advent-of-code)

2022 is the first event I've participated in, naturally the primary focus for me
is getting familiar with how things work, and building an efficient workflow for
ideating solutions. With that in mind, solutions are primarily written in
JavaScript/TypeScript*; languages I'm most comfortable with. Time permitting, I
may explore making my solutions more efficient and elegant.

*Currently using [Quokka Pro](https://quokkajs.com/) for rapid development

## Structure ##
### Directory Setup ###
```
"YYYY"
|--- "00"
|    |--- "soln.<extension>"
|    |--- ...
|--- ...
```

### Solution Setup ###

Solution files are prefixed with a comment linking to the challenge prompt and
provide the following setup (all casing by language convention):
1. `/^EXAMPLE_(?:IN|OUT)PUT$/`: constants used for testing and validation; a
single value or a tuple (if these differ between challenge parts)
1. `/^puzzle(?:_i|I)nput$/`: the unique, challenge-provided input for the puzzle
1. `/^(?<puzzleName>[a-z_]\w+)Part_?[12]$/`: a function for part N of the
challenge

NOTE: In the future, a CLI may exist to generate solution files provided valid
arguments and templates for some languages

**JavaScript Example**
```js
// https://adventofcode.com/2022/day/1

const EXAMPLE_INPUT = "1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000"
const EXAMPLE_OUTPUT = [24_000, 45_000]

/**
 * Your unique puzzle input
 * @see {@link https://adventofcode.com/2022/day/1/input}
 */
const puzzleInput = ""

/** @param {string} input */
const calorieCountingPart1 = (input) => {}

/** @param {string} input */
const calorieCountingPart2 = (input) => {}

//#region
const runTests = (() => {
  const $p = (result) => result === true ? "PASS" : "FAIL"

  // PART 1
  console.log(`example (1): ${$p(calorieCountingPart1(EXAMPLE_INPUT) === EXAMPLE_OUTPUT[0])}`)
  console.log(`solution (1): ${calorieCountingPart1(puzzleInput)}`)

  // PART 2
  console.log(`example (2): ${$p(calorieCountingPart2(EXAMPLE_INPUT) === EXAMPLE_OUTPUT[1])}`)
  console.log(`solution (2): ${calorieCountingPart2(puzzleInput)}`)
})()
//#endregion
```

---

More AoC
+ [About](https://adventofcode.com/about)
+ [Subreddit](https://www.reddit.com/r/adventofcode)

@[lewxdev](https://github.com/lewxdev) 2022, inquiries.lewis+dev@gmail.com