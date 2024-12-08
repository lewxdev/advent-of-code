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
            const sign = Math.sign(diff);
            return delta >= 1 && delta <= 3 && sign === Math.sign(refDiff);
          })
        ? sum + 1
        : sum, 0)
    .toString();
}

function part2(): string {
  return parseInput()
    .reduce((sum, report) =>
      report.some((_level, index) => {
          const adjustedReport = report.toSpliced(index, 1);
          return adjustedReport
            .slice(1)
            .map((level, index) => level - adjustedReport[index])
            .every((diff, _index, [refDiff]) => {
              const delta = Math.abs(diff);
              const sign = Math.sign(diff);
              return delta >= 1 && delta <= 3 && sign === Math.sign(refDiff);
            });
        })
        ? sum + 1
        : sum, 0)
    .toString();
}

export default function (part: "1" | "2"): string {
  return part === "1" ? part1() : part2();
}
