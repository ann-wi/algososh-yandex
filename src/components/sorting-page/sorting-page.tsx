import { useState, FormEvent, useEffect, FC } from "react";
import SortingPageStyles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { SortingRadioType, TSortingArr } from "./sorting-page-types";
import {
  randomArr,
  selectionSorting,
  bubbleSorting,
} from "../../utils/array-logic";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

export const SortingPage: FC = () => {
  const [sortArray, setSortArray] = useState<TSortingArr[]>([]);
  const [radioType, setRadioType] = useState<SortingRadioType | null>(null);
  const [sortType, setSortType] = useState<Direction | null>(null);
  const [isLoad, setLoad] = useState(false);
  const [isLoadAsc, setLoadAsc] = useState(false);
  const [isLoadDesc, setLoadDesc] = useState(false);

  const setNewArray = () => {
    const initArr = randomArr();
    setSortArray(initArr);
  };

  useEffect(() => {
    setNewArray();
  }, []);

  useEffect(() => {
    if (
      sortType === Direction.Ascending &&
      radioType === SortingRadioType.SelectionSort
    ) {
      selectionSorting(
        Direction.Ascending,
        sortArray,
        setSortArray,
        setLoad,
        setLoadAsc
      );
    } else if (
      sortType === Direction.Descending &&
      radioType === SortingRadioType.SelectionSort
    ) {
      selectionSorting(
        Direction.Descending,
        sortArray,
        setSortArray,
        setLoad,
        setLoadDesc
      );
    } else if (
      sortType === Direction.Ascending &&
      radioType === SortingRadioType.BubbleSort
    ) {
      bubbleSorting(
        Direction.Ascending,
        sortArray,
        setSortArray,
        setLoad,
        setLoadAsc
      );
    } else if (
      sortType === Direction.Descending &&
      radioType === SortingRadioType.BubbleSort
    ) {
      bubbleSorting(
        Direction.Descending,
        sortArray,
        setSortArray,
        setLoad,
        setLoadDesc
      );
    }
  }, [sortType]);

  const handleRadioBtn = () => {
    setRadioType(SortingRadioType.SelectionSort);
  };

  const onChangeRadioBubble = () => {
    setRadioType(SortingRadioType.BubbleSort);
  };

  const onSelectSortType = async (sort: Direction) => {
    setSortType(sort);
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
              onSelectSortType(Direction.Ascending);
            }}
            sorting={Direction.Ascending}
            isLoader={isLoadAsc}
            disabled={isLoad}
          />
          <Button
            text="По убыванию"
            onClick={() => onSelectSortType(Direction.Descending)}
            sorting={Direction.Descending}
            isLoader={isLoadDesc}
            disabled={isLoad}
          />
        </div>
        <div>
          <Button
            text="Новый массив"
            onClick={() => setNewArray()}
            extraClass={SortingPageStyles.btn_array}
            disabled={isLoad}
          />
        </div>
      </div>
      <div className={SortingPageStyles.columns}>
        {sortArray?.map((item, i: number) => (
          <Column key={i} index={item.item} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
