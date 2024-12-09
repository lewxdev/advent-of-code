// see: https://adventofcode.com/2024/day/5

console.log("--- Day 5: Print Queue ---");
const input = await Deno.readTextFile("./2024/05/input.txt");

const parseInput = () => {
  const [rulesSection, updatesSection] = input
    .trim()
    .split("\n\n")
    .map((section) => section.split("\n"));
  return {
    rules: rulesSection.map((rule) =>
      rule.split("|").map(Number) as [before: number, after: number]
    ),
    updates: updatesSection.map((update) => update.split(",").map(Number)),
  };
};

const filterUpdates = (
  { rules, updates }: ReturnType<typeof parseInput>,
  options: { isValid: boolean },
) =>
  updates.filter((update) =>
    options.isValid ===
      update.every((page, index) =>
        rules.every(([before, after]) =>
          page !== before ||
          !update.includes(after) ||
          update.slice(index + 1).includes(after)
        )
      )
  );

function part1(): string {
  return filterUpdates(parseInput(), { isValid: true })
    .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0)
    .toString();
}

function part2(): string {
  const { rules, updates } = parseInput();
  return filterUpdates({ rules, updates }, { isValid: false })
    .reduce((sum, update) => {
      update.sort((a, b) => {
        const [[before]] = rules.filter((rule) =>
          rule.includes(a) && rule.includes(b)
        );
        return before === a ? -1 : 1;
      });
      return sum + update[Math.floor(update.length / 2)];
    }, 0)
    .toString();
}

export default function (part: "1" | "2"): string {
  return part === "1" ? part1() : part2();
}
