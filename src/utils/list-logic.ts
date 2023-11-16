import { Dispatch, SetStateAction } from "react";
import { List } from "../utils/List";
import { ElementStates } from "../types/element-states";
import { delay } from "./delay";
import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { TListElement } from "../components/list-page/list-page-types";

export const addItemIndex = async (
  setOperationStarted: Dispatch<SetStateAction<boolean>>,
  setAddIndex: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TListElement>>,
  inputState: string,
  inputIndxState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TListElement[]>>,
  setInputIndexState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>,
  runAnimation: (num: number, end: number) => void
) => {
  setOperationStarted(true);
  setAddIndex(true);
  let num = 0;
  const end = Number(inputIndxState);
  await runAnimation(num, end);
  setSmallCircle({
    item: "",
    position: -1,
    state: ElementStates.Changing,
  });
  list.setDefaultColor();
  list.pushByIndex(
    { item: inputState, state: ElementStates.Modified },
    inputIndxState
  );
  list.setTail();
  setListArr([...list.arr]);
  await delay(SHORT_DELAY_IN_MS);
  list.arr[end].state = ElementStates.Default;
  setListArr([...list.arr]);
  setInputIndexState("");
  setInputState("");
  setAddIndex(false);
  setOperationStarted(false);
};

export const removeItemIndex = async (
  setStart: Dispatch<SetStateAction<boolean>>,
  setRemoveIndex: Dispatch<SetStateAction<boolean>>,
  setbottomOper: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TListElement>>,
  inputIndexState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TListElement[]>>,
  setInputIndexState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>,
  runAnim: (end: number) => void
) => {
  setStart(true);
  setRemoveIndex(true);
  setbottomOper((isbottom) => !isbottom);
  const end = Number(inputIndexState);
  await runAnim(end);
  list.removeByIndex(inputIndexState);
  list.setTail();
  setListArr([...list.arr]);
  setSmallCircle({
    item: "",
    position: -1,
    state: ElementStates.Changing,
  });
  list.setDefaultColor();
  setListArr([...list.arr]);
  setbottomOper((isbottom) => !isbottom);
  setInputIndexState("");
  setInputState("");
  setRemoveIndex(false);
  setStart(false);
};

export const addToHead = async (
  setStart: Dispatch<SetStateAction<boolean>>,
  setAddHead: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TListElement>>,
  smallCircle: TListElement,
  inputState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TListElement[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setStart(true);
  setAddHead(true);
  setSmallCircle({
    ...smallCircle,
    position: 0,
    item: inputState,
  });
  await delay(SHORT_DELAY_IN_MS);
  list.pushInHead({ item: inputState, state: ElementStates.Modified });
  setSmallCircle({
    item: "",
    position: -1,
    state: ElementStates.Changing,
  });
  list.setTail();
  setListArr([...list.arr]);
  await delay(SHORT_DELAY_IN_MS);
  list.arr[list.head].state = ElementStates.Default;
  setListArr([...list.arr]);
  setInputIndxState("");
  setInputState("");
  setAddHead(false);
  setStart(false);
};

export const removeFromHead = async (
  setStart: Dispatch<SetStateAction<boolean>>,
  setRemoveHead: Dispatch<SetStateAction<boolean>>,
  setbottomOper: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TListElement>>,
  smallCircle: TListElement,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TListElement[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setStart(true);
  setRemoveHead(true);
  setbottomOper((isbottom) => !isbottom);
  setSmallCircle({
    ...smallCircle,
    position: 0,
    item: list.arr[0].item,
  });
  await delay(SHORT_DELAY_IN_MS);
  setInputState("");
  setInputIndxState("");
  list.removeHead();
  setSmallCircle({
    item: "",
    position: -1,
    state: ElementStates.Changing,
  });
  list.setTail();
  setListArr([...list.arr]);
  setbottomOper((isbottom) => !isbottom);
  setRemoveHead(false);
  setStart(false);
};

export const addToTail = async (
  setStart: Dispatch<SetStateAction<boolean>>,
  setAddTail: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TListElement>>,
  smallCircle: TListElement,
  inputState: string,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TListElement[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setStart(true);
  setAddTail(true);
  setSmallCircle({
    ...smallCircle,
    position: list.arr.length - 1,
    item: inputState,
  });
  await delay(SHORT_DELAY_IN_MS);
  list.pushInTail({ item: inputState, state: ElementStates.Modified });
  list.setTail();
  setListArr([...list.arr]);
  setSmallCircle({
    item: "",
    position: -1,
    state: ElementStates.Changing,
  });
  await delay(SHORT_DELAY_IN_MS);
  list.getLastElem().state = ElementStates.Default;
  setListArr([...list.arr]);
  setInputIndxState("");
  setInputState("");
  setAddTail(false);
  setStart(false);
};

export const removeTailItem = async (
  setOperationStarted: Dispatch<SetStateAction<boolean>>,
  setRemoveTail: Dispatch<SetStateAction<boolean>>,
  setbottomOper: Dispatch<SetStateAction<boolean>>,
  setSmallCircle: Dispatch<SetStateAction<TListElement>>,
  smallCircle: TListElement,
  list: List<string>,
  setListArr: Dispatch<SetStateAction<TListElement[]>>,
  setInputIndxState: Dispatch<SetStateAction<string>>,
  setInputState: Dispatch<SetStateAction<string>>
) => {
  setOperationStarted(true);
  setRemoveTail(true);
  setbottomOper((isbottom) => !isbottom);
  setSmallCircle({
    ...smallCircle,
    position: list.arr.length - 1,
    item: list.getLastElem().item,
  });
  list.getLastElem().item = "";
  setListArr([...list.arr]);
  await delay(SHORT_DELAY_IN_MS);
  list.removeTail();
  list.setTail();
  setListArr([...list.arr]);
  setInputIndxState("");
  setInputState("");
  setbottomOper((isbottom) => !isbottom);
  setRemoveTail(false);
  setOperationStarted(false);
};

export const initArr = [
  { item: "0", state: ElementStates.Default },
  { item: "1", state: ElementStates.Default },
  { item: "2", state: ElementStates.Default },
];
