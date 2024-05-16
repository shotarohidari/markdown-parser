import { parseMarkdown } from "../lib/index"

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
  test("second-line-headingをパースできる", () => {
    const input = "##ハローワールド"
    const result = parseMarkdown(input)
    const expected = [{ type: "h2", text: "ハローワールド" }]

    expect(result).toEqual(expected)
  })
  test("複数行のsecond-line-headingをパースできる", () => {
    const input = "##ハローワールド\n##こんにちは世界"
    const result = parseMarkdown(input)
    const expected = [
      { type: "h2", text: "ハローワールド" },
      { type: "h2", text: "こんにちは世界" },
    ]

    expect(result).toEqual(expected)
  })
  test("first-line-headngとsecond-line-headingの混ざったものをパースできる", () => {
    const input = "##ハローワールド\n#こんにちは世界\n#ゆっくりしていってね"
    const result = parseMarkdown(input)
    const expected = [
      { type: "h2", text: "ハローワールド" },
      { type: "h1", text: "こんにちは世界" },
      { type: "h1", text: "ゆっくりしていってね" },
    ]

    expect(result).toEqual(expected)
  })
})
