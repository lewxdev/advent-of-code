// see: https://adventofcode.com/2024/day/3

console.log("--- Day 3: Mull It Over ---");
const input = await Deno.readTextFile("./2024/03/input.txt");

function part1(): string {
  return input
    .match(/(?<=mul\()\d+,\d+(?=\))/g)
    ?.reduce((sum, pair) =>
      sum + pair
        .split(",")
        .reduce((product, n) => product * Number(n), 1), 0)
    .toString() || "0";
}

function part2(): string {
  // add your answer here
  return "";
}

export default function (part: "1" | "2"): string {
  return part === "1" ? part1() : part2();
}
