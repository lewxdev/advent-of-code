// see: https://adventofcode.com/2024/day/6

import assert from "node:assert";

const inputFileUrl = new URL(import.meta.resolve("./input.txt"));
const input = await Deno.readTextFile(inputFileUrl);

function parseInput() {
  const width = input.trim().split("\n", 2)[0].length;
  return {
    width,
    patternMap: {
      up: new RegExp(`(?:[^#](?:.|\\n){${width}})*\\^`),
      down: new RegExp(`v(?:(?:.|\\n){${width}}[^#])*`),
      left: /[^#\n]*</,
      right: />[^#\n]*/,
    },
  };
}

// I did this iteratively so it could maybe be animated, lol

function part1() {
  const { width, patternMap } = parseInput();
  const padWidth = width + 1; // include: \n

  let map = input;
  let match: RegExpMatchArray | null;

  do {
    if ((match = map.match(patternMap.up))) {
      assert(typeof match.index !== "undefined");

      const start = match.index + match[0].length - 1;
      const end = match.index;
      for (let index = start; index >= end; index -= padWidth) {
        assert.notEqual(map[index], "#");
        const token = index === end && index - padWidth >= 0 ? ">" : "X";
        map = Array.from(map).with(index, token).join("");
      }
    }

    if ((match = map.match(patternMap.right))) {
      assert(typeof match.index !== "undefined");

      const start = match.index;
      const end = match.index + match[0].length - 1;
      for (let index = start; index <= end; index++) {
        assert.notEqual(map[index], "#");
        const token = index === end && index % padWidth !== width ? "v" : "X";
        map = Array.from(map).with(index, token).join("");
      }
    }

    if ((match = map.match(patternMap.down))) {
      assert(typeof match.index !== "undefined");

      const start = match.index;
      const end = match.index + match[0].length - 1;
      for (let index = start; index <= end; index += padWidth) {
        assert.notEqual(map[index], "#");
        const token = index === end && index + padWidth < map.length
          ? "<"
          : "X";
        map = Array.from(map).with(index, token).join("");
      }
    }

    if ((match = map.match(patternMap.left))) {
      assert(typeof match.index !== "undefined");

      const start = match.index + match[0].length - 1;
      const end = match.index;

      for (let index = start; index >= end; index--) {
        assert.notEqual(map[index], "#");
        const token = index === end && index % padWidth ? "^" : "X";
        map = Array.from(map).with(index, token).join("");
      }
    }
  } while (match);

  return map.match(/X/g)?.length;
}

function part2() {
  // add your answer here
}

export default function (part: "1" | "2") {
  console.log("--- Day 6: Guard Gallivant ---");
  return part === "1" ? part1() : part2();
}
