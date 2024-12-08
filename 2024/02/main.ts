// see: https://adventofcode.com/2024/day/2

console.log("--- Day 2: Red-Nosed Reports ---");
const input = await Deno.readTextFile("./2024/02/input.txt");

const parseInput = () =>
  input.trim().split("\n").map((line) => line.split(" ").map(Number));

function part1(): string {
  return parseInput()
    .reduce((sum, report) =>
      report
          .slice(1)
          .map((level, index) => level - report[index])
          .every((diff, _index, [refDiff]) => {
            const delta = Math.abs(diff);
            const refSign = Math.sign(refDiff);
            const sign = Math.sign(diff);
            return sign && refSign === sign && delta >= 1 && delta <= 3;
          })
        ? sum + 1
        : sum, 0)
    .toString();
}

function part2(): string {
  // add your answer here
  return "";
}

export default function (part: "1" | "2"): string {
  return part === "1" ? part1() : part2();
}
