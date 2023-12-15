import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { bubbleSorting, selectionSorting } from "../../utils/array-logic";

const oneElementArr = [{ item: 1, state: ElementStates.Default }];

const testingArr = [
  { item: 1, state: ElementStates.Default },
  { item: 3, state: ElementStates.Default },
  { item: 2, state: ElementStates.Default },
  { item: 4, state: ElementStates.Default },
];

const resultArrAsc = [
  { item: 1, state: ElementStates.Modified },
  { item: 2, state: ElementStates.Modified },
  { item: 3, state: ElementStates.Modified },
  { item: 4, state: ElementStates.Modified },
];

const resultArrDsc = [
  { item: 4, state: ElementStates.Modified },
  { item: 3, state: ElementStates.Modified },
  { item: 2, state: ElementStates.Modified },
  { item: 1, state: ElementStates.Modified },
];

describe("Testing sorting page", () => {
  let setSortArrayMock: jest.Mock;
  let setLoadMock: jest.Mock;
  let setLoadTypeMock: jest.Mock;

  beforeEach(() => {
    setSortArrayMock = jest.fn();
    setLoadMock = jest.fn();
    setLoadTypeMock = jest.fn();
  });

  it("Empty ascending array", async () => {
    await selectionSorting(
      Direction.Ascending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Empty descending array", async () => {
    await selectionSorting(
      Direction.Descending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Empty ascending array bubble sort", async () => {
    await bubbleSorting(
      Direction.Ascending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Empty descending array bubble sort", async () => {
    await bubbleSorting(
      Direction.Descending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("One element ascending array selection sort", async () => {
    await selectionSorting(
      Direction.Ascending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("One element descending array selection sort", async () => {
    await selectionSorting(
      Direction.Descending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("One element ascending array bubble sort", async () => {
    await bubbleSorting(
      Direction.Ascending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("One element descending array bubble sort", async () => {
    await bubbleSorting(
      Direction.Descending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Ascending array selection sort", async () => {
    await selectionSorting(
      Direction.Ascending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrAsc);
  });

  it("Descending array selection sort", async () => {
    await selectionSorting(
      Direction.Descending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrDsc);
  });

  it("Ascending array bubble sort", async () => {
    await bubbleSorting(
      Direction.Ascending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrAsc);
  });

  it("Descending array bubble sort", async () => {
    await bubbleSorting(
      Direction.Descending,
      testingArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    const sortedArr = setSortArrayMock.mock.calls[3][0];
    expect(sortedArr).toStrictEqual(resultArrDsc);
  });
});
