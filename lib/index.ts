import { MarkDown } from "./types"

function parseLine(line: string): MarkDown {
  const regex = /^(#(?<h1Text>[^#]+))|(##(?<h2Text>[^#]+))$/
  const match = regex.exec(line)
  if (!match || !match.groups) throw new Error("parse failed.")
  const { groups } = match
  if (groups["h1Text"]) {
    return { type: "h1", text: groups["h1Text"] }
  }
  if (groups["h2Text"]) {
    return { type: "h2", text: groups["h2Text"] }
  }
  throw new Error("unreachable!")
}
export function parseMarkdown(str: string): MarkDown[] {
  const lines = str.split("\n")
  return lines.map((line) => {
    return parseLine(line)
  })
}
