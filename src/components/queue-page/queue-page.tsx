import { delay } from "../../utils/delay";
import { useState, FC, useEffect, ChangeEvent } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue } from "../../utils/Queue";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import QueuePageStyles from "./queue-page.module.css";

const userQueue = new Queue<string>(7);

export const QueuePage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queueArray, setQueueArray] = useState<string[]>([]);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [animationState, setAnimationState] = useState(ElementStates.Default);
  const [actionType, setActionType] = useState<string>("");

  useEffect(() => {
    setQueueArray([...userQueue.getElements()]);
    return () => {
      userQueue.deleteElements();
      setQueueArray([...userQueue.getElements()]);
    };
  }, []);

  const changeAnimationState = async () => {
    setAnimationState(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setAnimationState(ElementStates.Default);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAction = async (type: string) => {
    if (type === "add") {
      setIsLoadingAdd(true);
      setActionType("push");
      await changeAnimationState();
      userQueue.enqueue(inputValue);
      setQueueArray([...userQueue.getElements()]);
      setInputValue("");
      setIsLoadingAdd(false);
    } else if (type === "remove") {
      setIsLoadingDelete(true);
      setActionType("");
      await changeAnimationState();
      userQueue.dequeue();
      setQueueArray([...userQueue.getElements()]);
      setIsLoadingDelete(false);
    } else if (type === "reset") {
      userQueue.deleteElements();
      setQueueArray([...userQueue.getElements()]);
      setInputValue("");
    } else {
      return;
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={QueuePageStyles.form}>
        <Input
          extraClass={QueuePageStyles.input}
          type="text"
          isLimitText={true}
          maxLength={4}
          value={`${inputValue}`}
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          id="addBtn"
          isLoader={isLoadingAdd}
          disabled={isLoadingDelete || !inputValue || userQueue.isFull()}
          onClick={() => {
            handleAction("add");
          }}
        />
        <Button
          text="Удалить"
          id="removeBtn"
          isLoader={isLoadingDelete}
          disabled={isLoadingAdd || !!userQueue.isEmpty()}
          onClick={() => {
            handleAction("remove");
          }}
          type="button"
        />
        <Button
          extraClass={QueuePageStyles.btn_reset}
          text="Очистить"
          disabled={isLoadingAdd || isLoadingDelete || !!userQueue.isEmpty()}
          onClick={() => {
            handleAction("reset");
          }}
          type="reset"
          id="resetBtn"
        />
      </form>
      <ul className={QueuePageStyles.circles}>
        {queueArray.map((letter, i: number) => {
          return (
            <li className={QueuePageStyles.circle} key={i}>
              <Circle
                head={i === userQueue.head && letter ? "head" : ""}
                tail={i === userQueue.tail - 1 && letter ? "tail" : ""}
                letter={letter}
                key={i}
                index={i}
                state={
                  actionType === "push"
                    ? i === userQueue.tail
                      ? animationState
                      : ElementStates.Default
                    : i === userQueue.head
                    ? animationState
                    : ElementStates.Default
                }
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
