import { MarkDown } from "./types"

function parseLine(line: string): MarkDown {
  const regex =
    /^(#(?<h1Text>[^#]+))|(##(?<h2Text>[^#]+))|(\*\*(?<quoteText>[^]+(?=\*\*))\*\*)$/
  const match = regex.exec(line)
  if (!match || !match.groups) {
    throw new Error("parse failed.")
  }
  const { groups } = match
  if (groups["h1Text"]) {
    return { type: "h1", text: groups["h1Text"] }
  }
  if (groups["h2Text"]) {
    return { type: "h2", text: groups["h2Text"] }
  }
  if (groups["quoteText"]) {
    return { type: "quote", text: groups["quoteText"] }
  }
  throw new Error("unreachable!")
}
export function parseMarkdown(str: string): MarkDown[] {
  const regex = /\n(?=#)/
  const lines = str.split(regex)
  return lines.map((line) => {
    return parseLine(line)
  })
}
