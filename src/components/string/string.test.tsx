import { testingStringReverse } from "../../utils/String";

describe("Testing String Reverse page", () => {
  it("Even number of items reversed correctly", () => {
    expect(testingStringReverse("012345")).toEqual([
      "5",
      "4",
      "3",
      "2",
      "1",
      "0",
    ]);
  });

  it("Odd number of items reversed correctly", () => {
    expect(testingStringReverse("01234")).toEqual(["4", "3", "2", "1", "0"]);
  });

  it("One item reversed correctly", () => {
    expect(testingStringReverse("0")).toEqual(["0"]);
  });

  it("Empty item reversed correctly", () => {
    expect(testingStringReverse("")).toEqual([]);
  });
});
