/**
 * Dynamically retrieves the unique puzzle input from
 * [Advent of Code](https://adventofcode.com) and produces solutions given the
 * provided functions `fns`
 * @param {string} dirname - the parent directory path of the executing file
 * @param {((input: string) => any)[]} fns - an array of functions to run
 */
module.exports = (dirname, fns) => {
  require("dotenv/config")

  const { SESSION_TOKEN } = process.env
  if (!SESSION_TOKEN) throw "Unable to retrieve SESSION_TOKEN"

  const pattern = /(?<event>\d{4})\/(?<day>\d{1,2})/
  const { event, day } = dirname.match(pattern).groups

  fetch(`https://adventofcode.com/${event}/day/${day}/input`, {
      headers: { cookie: `session=${SESSION_TOKEN}` }
    })
    .then((response) => response.text())
    .then((text) => {
      fns.forEach((fn, index) => {
        console.log(`Solution ${index + 1}:`, fn(text))
      })
    })
}