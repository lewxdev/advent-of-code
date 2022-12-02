# Advent of Code #
My personal, multi-event solutions for the annual series of programming
challenges known as [Advent of Code](https://adventofcode.com/about).
Currently competing on leaderboards for
[IndyHackers](https://www.indyhackers.org) and [Smarty](https://www.smarty.com/advent-of-code)

2022 is the first event I've participated in, naturally the primary focus for me
is getting familiar with how things work, and building an efficient workflow for
ideating solutions. With that in mind, solutions are primarily written in
JavaScript (with JSDoc typing) due to my familiarity. Time permitting, I may
explore making my solutions more efficient and elegant.

## Dependencies ##
- [`dotenv`](https://www.npmjs.com/package/dotenv) provides a simple way of
retrieving the required `SESSION_TOKEN` variable from a .env file for requesting
unique puzzle input
- [`jest`](https://jestjs.io/)/[`@types/jest`](https://www.npmjs.com/package/@types/jest)
lightweight testing library for validating solutions against provided examples

## Setup ##

NOTE: Currently recommending the
[Folder Templates extension](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) for quickly generating directory and file
structures

1. Install package dependencies from npm: `npm install`
1. (If using VS Code) install recommended extensions if/when prompted
1. Create directory structure with Folder Templates for a new event (e.g.
"AoC Event => 20XX")
1. Create a templated language directory in the respective puzzle directory and
fill in the empty content

### Directories ###
```md
|--- `"events"`
|    |--- `"####"`
|    |    The yearly event
|    |    |--- `"#"`
|    |    |    The daily challenge
|    |    |    |--- `"<language>"`
|    |    |    |    |--- `"soln.<extension>"`
|    |    |    |    |--- `"soln.test.<extension>"`
|    |    |    |--- ...
|    |    |--- ...
|    |--- ...
|--- `".env"`
|    Provides a `SESSION_TOKEN` variable for authenticating /input endpoints
|--- ...
```

### Solutions ###

Solution files are prefixed with a comment linking to the challenge prompt, two
functions (`/^(?<puzzleName>[a-z_]\w+)Part_?(?<N>[12])$/`) to implement a
solution for part N of the challenge, and an end process that will dynamically
retrieve the unique puzzle input and return solutions

---

More AoC
- [About](https://adventofcode.com/about)
- [Subreddit](https://www.reddit.com/r/adventofcode)

@[lewxdev](https://github.com/lewxdev) 2022, inquiries.lewis+dev@gmail.com