import { ElementStates } from "../../types/element-states";

export type TSortingArr = {
  state: ElementStates;
  item: number;
};

export enum SortingRadioType {
  SelectionSort = "selectSort",
  BubbleSort = "bubbleSort",
}
