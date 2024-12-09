// see: https://adventofcode.com/2024/day/4

console.log("--- Day 4: Ceres Search ---");
const input = await Deno.readTextFile("./2024/04/input.txt");

function part1(): string {
  const phrase = "XMAS";
  const buildPatterns = (offset: number) => {
    const meta = offset ? `[${phrase}\\n]{${offset}}` : "";
    const groups = phrase.split("").map((sub) => `(${sub})`);
    return [
      new RegExp(`(?=${groups.join(meta)})`, "g"),
      new RegExp(`(?=${groups.toReversed().join(meta)})`, "g"),
    ];
  };

  const width = input.trim().split("\n", 2)[0].length;
  return [
    ...buildPatterns(0),
    ...buildPatterns(width),
    ...buildPatterns(width + 1),
    ...buildPatterns(width - 1),
  ]
    .reduce((sum, pattern) => sum + (input.match(pattern)?.length || 0), 0)
    .toString();
}

function part2(): string {
  // I got lazy, okay?
  return [
    /(?=(M)[XMAS](S)[XMAS\n]{139}(A)[XMAS\n]{139}(M)[XMAS](S))/g,
    /(?=(M)[XMAS](M)[XMAS\n]{139}(A)[XMAS\n]{139}(S)[XMAS](S))/g,
    /(?=(S)[XMAS](M)[XMAS\n]{139}(A)[XMAS\n]{139}(S)[XMAS](M))/g,
    /(?=(S)[XMAS](S)[XMAS\n]{139}(A)[XMAS\n]{139}(M)[XMAS](M))/g,
  ]
    .reduce((sum, pattern) => sum + (input.match(pattern)?.length || 0), 0)
    .toString();
}

export default function (part: "1" | "2"): string {
  return part === "1" ? part1() : part2();
}
