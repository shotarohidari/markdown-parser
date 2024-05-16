describe("sum", () => {
  test("1 + 1 = 2", () => {
    expect(1 + 1).toBe(2)
  })
})

type MarkDown = { type: "h1"; text: string }

function parseLine(line: string): MarkDown {
  const regex = /^#(?<text>.+)$/
  const match = regex.exec(line)
  const text = match?.groups?.["text"] || ""
  return { type: "h1", text }
}
function parseMarkdown(str: string): MarkDown[] {
  const lines = str.split("\n")
  return lines.map((line) => {
    return parseLine(line)
  })
}
describe("parseMarkdown", () => {
  test("first-line-headingをパースできる", () => {
    const input = "#ハローワールド"
    const result = parseMarkdown(input)
    const expected = [{ type: "h1", text: "ハローワールド" }]

    expect(result).toEqual(expected)
  })
  test("複数行のfirst-line-headingをパースできる", () => {
    const input = "#ハローワールド\n#こんにちは世界"
    const result = parseMarkdown(input)
    const expected = [
      { type: "h1", text: "ハローワールド" },
      { type: "h1", text: "こんにちは世界" },
    ]

    expect(result).toEqual(expected)
  })
})
