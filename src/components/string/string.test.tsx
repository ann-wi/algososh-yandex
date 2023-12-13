import { testingStringReverse } from "../../utils/String";

describe("String component testing", () => {
  it("reversing a string with an even number of items", () => {
    expect(testingStringReverse("012345")).toEqual([
      "5",
      "4",
      "3",
      "2",
      "1",
      "0",
    ]);
  });

  it("reversing a string with an odd number of items", () => {
    expect(testingStringReverse("01234")).toEqual(["4", "3", "2", "1", "0"]);
  });

  it("reversing a string with an one item", () => {
    expect(testingStringReverse("0")).toEqual(["0"]);
  });

  it("empty line reversal", () => {
    expect(testingStringReverse("")).toEqual([]);
  });
});
