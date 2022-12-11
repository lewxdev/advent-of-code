// Find the challenge here: https://adventofcode.com/2022/day/11

/**
 * @typedef Monkey
 * @property {number} inspectionCount
 * increments each time the Money inspects an item
 * @property {number[]} items
 * corresponds to the `worryLevel` of carried items
 * @property {(worryLevel: number) => number} performOperation
 * computes the item's new `worryLevel`
 * @property {(worryLevel: number) => number} performThrowDecision
 * computes which index to throw the inspected item to next
 */

/**
 * @param {string} input
 * @returns {Monkey[]}
 */
const parseMonkeyNotes = (input) =>
  input.trim().split("\n\n").map((notes) =>
    notes.split(/\n\s{2}\b/g).slice(1).reduce((data, content, index) => {
      switch (index) {
        case 0:
          return {
            ...data,
            items: content.match(/(?:\d+(?:,\s)?)+$/)[0].split(", ").map(Number)
          }

        case 1:
          const { operator: $operator, operand: $operand } =
            content.match(/(?<operator>\*|\+)\s(?<operand>old|\d+)$/).groups

          const performOperation = (worryLevel) => {
            const operand = $operand === "old" ? worryLevel : Number($operand)
            return $operator === "*"
              ? worryLevel * operand
              : worryLevel + operand
          }

          return { ...data, performOperation }

        case 2:
          const [factor, choiceA, choiceB] = content.match(/\d+$/gm).map(Number)
          const performThrowDecision = (worryLevel) =>
            worryLevel % factor === 0 ? choiceA : choiceB

          return { ...data, performThrowDecision }
      }
    }, { inspectionCount: 0 })
  )

/** @param {string} input - the provided puzzle input string */
exports.monkeyInTheMiddlePart1 = (input) => {
  const monkeys = parseMonkeyNotes(input)

  /** @param {Monkey} monkey */
  const doItemsInspection = (monkey) => {
    for (const $old of monkey.items) {
      monkey.inspectionCount++

      const $new = Math.floor(monkey.performOperation($old) / 3)
      monkeys[monkey.performThrowDecision($new)].items.push($new)
    }

    monkey.items = []
  }

  for (let _ = 0; _ < 20; _++) monkeys.forEach(doItemsInspection)

  return monkeys
    .map(({ inspectionCount }) => inspectionCount)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((product, inspectionCount) => product * inspectionCount)
}

/** @param {string} input - the provided puzzle input string */
exports.monkeyInTheMiddlePart2 = (input) => { }


if (require.main === module) {
  const { testSolutions } = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}