// see: https://adventofcode.com/2024/day/5

console.log("--- Day 5: Print Queue ---");
const input = await Deno.readTextFile("./2024/05/input.txt");

const parseInput = () => {
  const sections = input
    .trim()
    .split("\n\n")
    .map((section) => section.split("\n"));
  return sections.map((section, index) =>
    index
      ? section.map((update) => update.split(",").map(Number))
      : section.map((rule) => {
        const [before, after] = rule.split("|").map(Number);
        return { before, after };
      })
  ) as [rules: { before: number; after: number }[], updates: number[][]];
};

function part1(): string {
  const [rules, updates] = parseInput();
  const groupedRules = Object.groupBy(rules, ({ before }) => before);

  return updates
    .reduce((sum, update) =>
      update.every((page, index) => {
          const pageRules = groupedRules[page];
          if (!pageRules) return true;

          const slice = update.slice(index + 1);
          return pageRules.every(({ after }) =>
            !update.includes(after) || slice.includes(after)
          );
        })
        ? sum + update[Math.floor(update.length / 2)]
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
