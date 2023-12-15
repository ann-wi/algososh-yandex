import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../types/element-states";
import { delay } from "./delay";
import { TSortingArr } from "../components/sorting-page/sorting-page-types";
import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { Direction } from "../types/direction";

export const randomArr = () => {
  const randomArr = [];
  const limit = Math.floor(Math.random() * (17 - 3 + 1)) + 3;

  for (let i = 0; i <= limit; i++) {
    randomArr.push({
      state: ElementStates.Default,
      item: Math.floor(Math.random() * 100),
    });
  }
  return randomArr;
};

// SORTING
export const selectionSorting = async (
  type: Direction,
  arr: TSortingArr[],
  setSortArray: Dispatch<SetStateAction<TSortingArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setLoadType: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setLoadType(true);

  for (let i = 0; i < arr.length - 1; i++) {
    let defaultArray = arr[i].item;
    let index = 0;
    arr[i].state = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].state = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      if (type === Direction.Ascending) {
        if (arr[j].item <= defaultArray) {
          defaultArray = arr[j].item;
          index = j;
        }
      } else if (type === Direction.Descending) {
        if (arr[j].item >= defaultArray) {
          defaultArray = arr[j].item;
          index = j;
        }
      }

      arr[j].state = ElementStates.Default;
      setSortArray([...arr]);
    }

    if (type === Direction.Ascending) {
      if (defaultArray < arr[i].item) {
        arr[index].item = arr[i].item;
        arr[i].item = defaultArray;
      }
    } else if (type === Direction.Descending) {
      if (defaultArray > arr[i].item) {
        arr[index].item = arr[i].item;
        arr[i].item = defaultArray;
      }
    }

    arr[i].state = ElementStates.Modified;

    setSortArray([...arr]);
  }

  if (arr.length <= 0 || arr.length === 1) {
    return;
  }

  arr[arr.length - 1].state = ElementStates.Modified;
  setSortArray([...arr]);
  setLoad(false);
  setLoadType(false);
};

export const bubbleSorting = async (
  type: Direction,
  arr: TSortingArr[],
  setSortArray: Dispatch<SetStateAction<TSortingArr[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
  setLoadType: Dispatch<SetStateAction<boolean>>
) => {
  setLoad(true);
  setLoadType(true);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setSortArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      if (type === Direction.Ascending) {
        if (arr[j].item > arr[j + 1].item) {
          const defaultArray = arr[j].item;
          arr[j].item = arr[j + 1].item;
          arr[j + 1].item = defaultArray;
        }
      } else if (type === Direction.Descending) {
        if (arr[j].item < arr[j + 1].item) {
          const defaultArray = arr[j].item;
          arr[j].item = arr[j + 1].item;
          arr[j + 1].item = defaultArray;
        }
      }

      arr[j].state = ElementStates.Default;
    }
    if (arr.length <= 0 || arr.length === 1) {
      return;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
  }
  setLoad(false);
  setLoadType(false);
};
