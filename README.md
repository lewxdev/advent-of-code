# 🎄 Advent of Code

This repository includes my personal solution framework for the
[Advent of Code](https://adventofcode.com) challenges. Capabilities include:

- **Automatic setup** - creates files for challenges and input data
- **Easy submission** - submit solutions directly from the command line

## Setup

> [!IMPORTANT]
> Be sure Deno is installed before proceeding. If not, follow the steps in the
> [provided guide](https://docs.deno.com/runtime/getting_started/installation/).

1. **Clone the repository**

   ```shell
   git clone https://github.com/lewxdev/advent-of-code.git
   cd advent-of-code
   ```

1. **Create a `.env` file**

   ```shell
   echo "AOC_SESSION=your_session_id" > .env
   ```

   Replace `your_session_id` with the session cookie found on the Advent of Code
   website. You can find this by authenticating in a browser and copying the
   value of the `session` cookie from the developer tools.

## Usage

1. **Run the setup script**

   ```shell
   deno run dev
   ```

   This will prompt you to enter the event year and day, and create the
   necessary files.

1. **Run the dev script**

   ```shell
   deno run dev <filepath>
   ```

   This will run the script in watch mode and prompt you to submit when the
   solution changes. Alternatively, you can open the script in Visual Studio
   Code and run the `deno: dev` task from the command palette.

   > [!IMPORTANT]
   > When providing a filepath, be sure the path is a valid import path (e.g.
   > relative to the project root: `./2020/01.ts` or an absolute path:
   > `/home/user/projects/advent-of-code/2020/01.ts`). An error will be thrown
   > if the path is invalid.