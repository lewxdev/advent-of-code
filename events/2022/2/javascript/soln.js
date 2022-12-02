// Find the challenge here: https://adventofcode.com/2022/day/2

/** @param {string} input */
exports.rockPaperScissorsPart1 = (input) => {
  return input.trim().split("\n").reduce((acc, round) => {
    const moveValue = [/X$/, /Y$/, /Z$/]
      .findIndex((pattern) => round.match(pattern)) + 1
    const roundValue = [/^(?:A Z|B X|C Y)$/, /^(?:A X|B Y|C Z)$/, /^(?:A Y|B Z|C X)$/]
      .findIndex((pattern) => round.match(pattern)) * 3

    return acc + moveValue + roundValue
  }, 0)
}

/** @param {string} input */
exports.rockPaperScissorsPart2 = (input) => {
  const key = {
    opponent: { rock: /^A/, paper: /^B/, scissors: /^C/ },
    result: { loss: /X$/, draw: /Y$/, win: /Z$/ },
    score: {
      loss: { rock: 3, paper: 1, scissors: 2 },
      draw: { rock: 4, paper: 5, scissors: 6 },
      win: { rock: 8, paper: 9, scissors: 7 }
    }
  }

  return input.trim().split("\n").reduce((acc, round) => {
    const [desiredResult] = Object.entries(key.result).find(([, pattern]) => round.match(pattern))
    const [opponentMove] = Object.entries(key.opponent).find(([, pattern]) => round.match(pattern))

    return acc + key.score[desiredResult][opponentMove]
  }, 0)
}

if (require.main === module) {
  const testSolutions = require("testers/javascript")
  testSolutions(__dirname, Object.values(exports))
}