#!/usr/bin/env -S deno run -E=AOC_SESSION -N=adventofcode.com -R=. -W=. --env-file=.env.local --watch

import assert from "node:assert";
import dedent from "npm:dedent";
import ky from "npm:ky";
import z from "npm:zod";

const prefixUrl = "https://adventofcode.com";
const aoc = ky.create({
  prefixUrl,
  headers: {
    cookie: `session=${Deno.env.get("AOC_SESSION")}`,
  },
});

const prompt = <TSchema extends z.ZodTypeAny = z.ZodString>(
  schema: TSchema = z.string() as z.ZodTypeAny as TSchema,
  message: string,
  defaultValue?: z.TypeOf<TSchema>,
): z.TypeOf<TSchema> => {
  const input = globalThis.prompt(message, defaultValue);
  assert(input !== null, "noninteractive mode not supported");

  const { success, data, error } = schema.safeParse(input);
  if (success) return data;

  error.issues.forEach(({ message }) => console.error("❌", message));
  return prompt(schema, message, input);
};

const [filepath] = Deno.args;

if (!filepath) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const lastValidYear = month === 12 ? year : year - 1;
  const eventYear = prompt(
    z.coerce.number().int().min(2015).max(lastValidYear),
    `enter the event year:`,
    lastValidYear,
  );

  const lastValidDay = lastValidYear === eventYear && day < 25 ? day : 25;
  const eventDay = prompt(
    z.coerce.number().int().min(1).max(lastValidDay),
    `enter the event day:`,
    lastValidDay,
  );

  const eventUrl = `${eventYear}/day/${eventDay}`;
  const dirname = `./${eventYear}/${eventDay.toString().padStart(2, "0")}`;
  const entryFile = `${dirname}/main.ts`;
  const inputFile = `${dirname}/input.txt`;

  const inputText = await aoc.get(`${eventUrl}/input`).text();
  const title = await aoc.get(eventUrl).text().then((text) => {
    const [match] = text.match(/--- Day \d+: .+ ---/) || [];
    return match || `--- Day ${eventDay} ---`;
  });

  const content = dedent`
    // see: ${prefixUrl}/${eventUrl}

    console.log("${title}");
    const input = await Deno.readTextFile("${inputFile}");

    function part1(): string {
      // add your answer here
      return "";
    }

    function part2(): string {
      // add your answer here
      return "";
    }

    export default function (part: "1" | "2"): string {
      return part === "1" ? part1() : part2();
    }

  `;

  await Deno.mkdir(dirname, { recursive: true });
  await Deno.writeTextFile(inputFile, inputText);
  await Deno.writeTextFile(entryFile, content);

  console.log("🔗 see: %s", `${prefixUrl}/${eventUrl}`);
  console.log("💻 open: %s", entryFile);
  Deno.exit();
}

const prevSubmit = localStorage.getItem(`submit:${filepath}`);
const level = z
  .enum(["1", "2", "done"])
  .parse(localStorage.getItem(`level:${filepath}`) || "1");

if (level === "done") {
  console.log("answer already submitted");
  Deno.exit();
}

const answer = z
  .object({
    default: z.function().args(z.enum(["1", "2"])).returns(z.string()),
  })
  .parse(await import(filepath))
  .default(level);
console.log(answer);

if (answer && answer !== prevSubmit && confirm("submit answer?")) {
  console.log("submitting answer");
  localStorage.setItem(`submit:${filepath}`, answer);

  const params = new URLSearchParams();
  params.set("level", level);
  params.set("answer", answer);

  const text = await aoc
    // @ts-expect-error -- https://github.com/sindresorhus/ky#sending-form-data
    .post(`${this.url}/answer`, { body: params })
    .text();

  if (!text.includes("That's not the right answer.")) {
    const state = level === "1" ? "2" : "done";
    localStorage.setItem(`level:${filepath}`, state);
    console.log("✔️ correct!");
    console.log("\t level: %s → %s", level, state);
  } else {
    console.log("❌ incorrect");
  }
}
