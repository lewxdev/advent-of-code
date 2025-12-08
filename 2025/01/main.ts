// see: https://adventofcode.com/2025/day/1

const inputFileUrl = new URL(import.meta.resolve("./input.txt"));
const input = await Deno.readTextFile(inputFileUrl);

function parseInput() {
  return input
    .trim()
    .split("\n")
    .map((value) => {
      const [direction, distance] = value.split(/(\d+)/, 2);
      const sign = direction === "R" ? 1 : -1;
      return sign * parseInt(distance);
    });
}

function part1() {
  const digits = 100;
  const rotations = parseInput();

  return rotations
    .reduce(([count, value], rotation) => {
      // see: https://en.wikipedia.org/wiki/Modular_arithmetic
      const newValue = (value % digits + rotation % digits) % digits;
      return [count + Number(newValue === 0), newValue];
    }, [0, 50])
    .at(0);
}

function part2() {
  // add your answer here
}

export default function (part: "1" | "2") {
  console.log("--- Day 1: Secret Entrance ---");
  return part === "1" ? part1() : part2();
}
