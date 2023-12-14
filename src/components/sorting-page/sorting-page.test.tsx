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

describe("Тестирование сортировок массива", () => {
  let setSortArrayMock: jest.Mock;
  let setLoadMock: jest.Mock;
  let setLoadTypeMock: jest.Mock;

  beforeEach(() => {
    setSortArrayMock = jest.fn();
    setLoadMock = jest.fn();
    setLoadTypeMock = jest.fn();
  });

  it("Пустой массив выбором на возрастание", async () => {
    await selectionSorting(
      Direction.Ascending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Пустой массив выбором на убывание", async () => {
    await selectionSorting(
      Direction.Descending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Пустой массив пузырьком на возрастание", async () => {
    await bubbleSorting(
      Direction.Ascending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Пустой массив пузырьком на убывание", async () => {
    await bubbleSorting(
      Direction.Descending,
      [],
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Сортировка выбором на возрастание с одним эл-том", async () => {
    await selectionSorting(
      Direction.Ascending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Сортировка выбором на убывание с одним эл-том", async () => {
    await selectionSorting(
      Direction.Descending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Сортировка пузырьком на убывание с одним эл-том", async () => {
    await bubbleSorting(
      Direction.Ascending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Сортировка пузырьком на возрастание с одним эл-том", async () => {
    await bubbleSorting(
      Direction.Descending,
      oneElementArr,
      setSortArrayMock,
      setLoadMock,
      setLoadTypeMock
    );
    expect(setSortArrayMock).toHaveBeenCalledTimes(0);
  });

  it("Сортировка выбором на возрастание базовая", async () => {
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

  it("Сортировка выбором на убывание базовая", async () => {
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

  it("Сортировка пузырьком на возрастание базовая", async () => {
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

  it("Сортировка пузырьком на убывание базовая", async () => {
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
