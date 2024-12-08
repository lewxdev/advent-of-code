// see: https://adventofcode.com/2024/day/1

console.log("--- Day 1: Historian Hysteria ---");
const input = await Deno.readTextFile("./2024/01/input.txt");

const parseInput = () =>
  input
    .trim()
    .split("\n")
    .reduce<[listA: number[], listB: number[]]>(([listA, listB], line) => {
      const [left, right] = line.split(/\s+/).map(Number);
      return [listA.concat(left), listB.concat(right)];
    }, [[], []]);

function part1(): string {
  const [listA, listB] = parseInput();
  listA.sort();
  return listB
    .sort()
    .reduce((sum, value, index) => sum + Math.abs(value - listA[index]), 0)
    .toString();
}

function part2(): string {
  const [listA, listB] = parseInput();
  return listA
    .reduce((sum, valueA) => {
      const occurrences = listB.filter((valueB) => valueA === valueB).length;
      return valueA * occurrences + sum;
    }, 0)
    .toString();
}

export default function (part: "1" | "2"): string {
  return part === "1" ? part1() : part2();
}
