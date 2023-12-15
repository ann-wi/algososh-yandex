import { FC, useEffect, useState, ChangeEvent } from "react";
import ListPageStyles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { List } from "../../utils/List";
import {
  initArr,
  addToHead,
  addToTail,
  addItemIndex,
  removeFromHead,
  removeItemIndex,
  removeTailItem,
} from "../../utils/list-logic";
import { TListElement } from "./list-page-types";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: FC = () => {
  const [isComponent, setComponent] = useState(false);

  const list = new List(initArr);

  const [inputValue, setInputValue] = useState<string>("");
  const [userIndexValue, setInputIndexState] = useState<string>("");

  const [isAddToHead, setAddToHead] = useState(false);
  const [isRemoveFromHead, setRemoveFromHead] = useState(false);
  const [isAddToTail, setAddToTail] = useState(false);
  const [isRemoveFromTail, setRemoveFromTail] = useState(false);
  const [isAddIndex, setAddIndex] = useState(false);
  const [isRemoveIndex, setRemoveIndex] = useState(false);

  const [isStart, setIsStart] = useState(false);
  const [isBottom, setBottom] = useState(false);

  const [disable, setDisable] = useState(false);
  const [listArray, setListArray] = useState<TListElement[]>(list.arr);
  const [roundTip, setRoundTip] = useState<TListElement>({
    item: "",
    state: ElementStates.Changing,
    position: -1,
  });

  useEffect(() => {
    setComponent(true);
    return () => {
      setComponent(false);
    };
  }, []);

  const changeIndexHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndexState(e.target.value);
    const num = Number(e.target.value);
    if (num >= list.arr.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addAnimation = async (num: number, end: number) => {
    if (isComponent) {
      for (let i = 0; i <= end; i++) {
        setRoundTip({
          ...roundTip,
          item: inputValue,
          position: i,
        });
        await delay(SHORT_DELAY_IN_MS);
        list.arr[num].state = ElementStates.Changing;
        if (num < end) {
          num++;
        }
        setListArray([...list.arr]);
      }
    }
  };

  const removeAnimation = async (end: number) => {
    if (isComponent) {
      setIsStart(true);
      for (let i = 0; i <= end; i++) {
        list.arr[i].state = ElementStates.Changing;
        setListArray([...list.arr]);
        await delay(SHORT_DELAY_IN_MS);
      }
      list.arr[end].state = ElementStates.Default;

      setRoundTip({
        ...roundTip,
        item: list.arr[end].item,
        position: end,
      });
      await delay(SHORT_DELAY_IN_MS);
      setIsStart(false);
    }
  };

  const handleClick = (type: string) => {
    if (type === "addToHead") {
      addToHead(
        setIsStart,
        setAddToHead,
        setRoundTip,
        roundTip,
        inputValue,
        list,
        setListArray,
        setInputIndexState,
        setInputValue
      );
    } else if (type === "addToTail") {
      addToTail(
        setIsStart,
        setAddToTail,
        setRoundTip,
        roundTip,
        inputValue,
        list,
        setListArray,
        setInputIndexState,
        setInputValue
      );
    } else if (type === "removeFromHead") {
      removeFromHead(
        setIsStart,
        setRemoveFromHead,
        setBottom,
        setRoundTip,
        roundTip,
        list,
        setListArray,
        setInputIndexState,
        setInputValue
      );
    } else if (type === "removeFromTail") {
      removeTailItem(
        setIsStart,
        setRemoveFromTail,
        setBottom,
        setRoundTip,
        roundTip,
        list,
        setListArray,
        setInputIndexState,
        setInputValue
      );
    } else if (type === "addItemIndex") {
      addItemIndex(
        setIsStart,
        setAddIndex,
        setRoundTip,
        inputValue,
        userIndexValue,
        list,
        setListArray,
        setInputIndexState,
        setInputValue,
        addAnimation
      );
    } else if (type === "removeItemIndex") {
      removeItemIndex(
        setIsStart,
        setRemoveIndex,
        setBottom,
        setRoundTip,
        userIndexValue,
        list,
        setListArray,
        setInputIndexState,
        setInputValue,
        removeAnimation
      );
    } else {
      return;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={ListPageStyles.inputs}>
        <div className={ListPageStyles.buttons}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={changeValueHandler}
            id="textInput"
          />
          <Button
            text="Добавить в head"
            onClick={() => handleClick("addToHead")}
            disabled={!inputValue || isStart}
            isLoader={isAddToHead}
            id="headAddBtn"
          />
          <Button
            text="Добавить в tail"
            disabled={!inputValue || isStart}
            onClick={() => handleClick("addToTail")}
            isLoader={isAddToTail}
            id="tailAddBtn"
          />
          <Button
            text="Удалить из head"
            onClick={() => handleClick("removeFromHead")}
            isLoader={isRemoveFromHead}
            disabled={list.isEmpty() || isStart}
            id="headDelBtn"
          />
          <Button
            text="Удалить из tail"
            onClick={() => handleClick("removeFromTail")}
            isLoader={isRemoveFromTail}
            disabled={list.isEmpty() || isStart}
            id="tailDelBtn"
          />
          <Input
            maxLength={4}
            type="number"
            value={userIndexValue}
            onChange={changeIndexHandler}
            placeholder="Введите индекс"
            id="indexInput"
          />
          <Button
            extraClass={ListPageStyles.index_add}
            text="Добавить по индексу"
            disabled={!userIndexValue || !inputValue || disable || isStart}
            onClick={() => handleClick("addItemIndex")}
            isLoader={isAddIndex}
            id="indexAddBtn"
          />
          <Button
            extraClass={ListPageStyles.index_remove}
            text="Удалить по индексу"
            disabled={
              !userIndexValue ||
              disable ||
              isStart ||
              Number(userIndexValue) > listArray.length - 1 ||
              Number(userIndexValue) < 0
            }
            onClick={() => handleClick("removeItemIndex")}
            isLoader={isRemoveIndex}
            id="indexDelBtn"
          />
        </div>
      </form>
      <ul className={ListPageStyles.elements_list}>
        {listArray?.map((item, i: number) => (
          <li className={ListPageStyles.circles} key={i}>
            {roundTip.position === i && (
              <Circle
                isSmall={true}
                letter={roundTip.item}
                state={roundTip.state}
                extraClass={`${isBottom && ListPageStyles.bottom_tip}`}
              />
            )}
            <Circle
              extraClass={ListPageStyles.default_element}
              letter={item.item}
              state={item.state}
              index={i}
              head={
                i === list.getHead() && i !== roundTip.position ? "head" : ""
              }
              tail={
                i === listArray.length - 1 && i !== roundTip.position
                  ? "tail"
                  : ""
              }
            />
            {i < listArray.length - 1 && (
              <div className={ListPageStyles.arrow_box}>
                <ArrowIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
