import React, { ChangeEvent, useState } from "react";
import SortingPageStyles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { SortingRadioType, TSortingArr } from "./sorting-page-types";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [sortArray, setSortArray] = useState<TSortingArr[]>([]);
  const [radioType, setRadioType] = useState<SortingRadioType | null>(null);
  const [sortType, setSortType] = useState<Direction | null>(null);
  const [isLoad, setLoad] = useState(false);
  const [isLoadAsc, setLoadAsc] = useState(false);
  const [isLoadDesc, setLoadDesc] = useState(false);

  //const handleRadioBtn = (e: ChangeEvent<HTMLInputElement>): void => {};

  const swapArray = (
    arr: TSortingArr[] | string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const initArr = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = initArr;
  };

  const randomArr = () => {
    const randomArr: TSortingArr[] = [];
    const limit = Math.floor(Math.random() * (17 - 3 + 1)) + 3;

    for (let i = 0; i <= Math.floor(Math.random() * 100); i++) {
      randomArr.push({
        item: Math.floor(Math.random() * 100),
        state: ElementStates.Default,
      });
    }
    return setSortArray(randomArr);
  };

  const selectionSorting = async (arr: TSortingArr[], direction: boolean) => {
    setLoad(true);
    for (let i = 0; i < arr.length; i++) {
      let maxIndex = i;
      arr[maxIndex].state = ElementStates.Changing;
      for (let p = i + 1; p < arr.length; p++) {
        arr[p].state = ElementStates.Changing;
        setSortArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          direction
            ? arr[p].item < arr[maxIndex].item
            : arr[p].item > arr[maxIndex].item
        ) {
          maxIndex = p;
          arr[p].state = ElementStates.Changing;
          arr[maxIndex].state =
            p === maxIndex ? ElementStates.Changing : ElementStates.Default;
        }
        if (p !== maxIndex) {
          arr[p].state = ElementStates.Default;
        }
        setSortArray([...arr]);
      }
      swapArray(arr, maxIndex, i);
      arr[maxIndex].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setSortArray([...arr]);
    }
    setLoad(false);
    return arr;
  };

  const bubbleSorting = async (arr: TSortingArr[], direction: boolean) => {
    setLoad(true);
    for (let i = 0; i < arr.length; i++) {
      for (let p = 0; p < arr.length - i - 1; p++) {
        const rightItem = arr[p + 1].item;
        const leftItem = arr[p].item;
        arr[p].state = ElementStates.Changing;
        arr[p + 1].state = ElementStates.Changing;
        setSortArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (direction ? leftItem > rightItem : leftItem < rightItem) {
          arr[p].item = rightItem;
          arr[p + 1].item = leftItem;
        }
        arr[p].state = ElementStates.Default;
        arr[p + 1] && (arr[p + 1].state = ElementStates.Default);
        setSortArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setSortArray([...arr]);
    }
    setLoad(true);
    return arr;
  };

  const handleRadioBtn = () => {
    setRadioType(SortingRadioType.SelectionSort);
  };

  const onChangeRadioBubble = () => {
    setRadioType(SortingRadioType.BubbleSort);
  };

  const onSelectSortType = async (sort: Direction) => {
    setSortType(sort);
  };

  const startSorting = async (direction: string) => {
    const match = direction === "Direction.Ascending";
    radioType === "selectSort"
      ? setSortArray([...(await selectionSorting(sortArray, match))])
      : setSortArray([...(await bubbleSorting(sortArray, match))]);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={SortingPageStyles.container}>
        <div className={SortingPageStyles.radio}>
          <RadioInput
            label={"Выбор"}
            checked={radioType === SortingRadioType.SelectionSort}
            onChange={handleRadioBtn}
            disabled={isLoad}
          />
          <RadioInput
            label={"Пузырек"}
            checked={radioType === SortingRadioType.BubbleSort}
            onChange={onChangeRadioBubble}
            disabled={isLoad}
          />
        </div>
        <div className={SortingPageStyles.btn}>
          <Button
            text="По возрастанию"
            onClick={() => {
              startSorting(Direction.Ascending);
            }}
            sorting={Direction.Ascending}
            isLoader={isLoadAsc}
            disabled={isLoad}
          />
          <Button
            text="По убыванию"
            onClick={() => startSorting(Direction.Descending)}
            sorting={Direction.Descending}
            isLoader={isLoadDesc}
            disabled={isLoad}
          />
        </div>
        <div>
          <Button
            text="Новый массив"
            onClick={() => randomArr()}
            extraClass={SortingPageStyles.btn}
            disabled={isLoad}
          />
        </div>
      </div>
      <div className={SortingPageStyles.columns}>
        {sortArray?.map((item, i: number) => (
          <Column key={i} index={i} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
