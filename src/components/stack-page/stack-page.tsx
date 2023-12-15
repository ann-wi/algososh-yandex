import { FC, FormEvent } from "react";
import StackPageStyles from "./stack-page.module.css";
import { Stack } from "../../utils/Stack";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../utils/hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TValues = {
  values: {
    inputValue: string;
    stackArr: string[];
    currentIndex: number;
    loaderAdd: boolean;
    loaderDel: boolean;
  };
  setValues: (arg: any) => void;
};

const stack = new Stack<string>();

export const StackPage: FC = () => {
  const { values, setValues }: TValues = useForm({
    inputValue: null,
    stackArr: null,
    currentIndex: null,
    loaderAdd: false,
    loaderDel: false,
  });

  const handleInput = (e: FormEvent<HTMLInputElement>): void => {
    setValues({
      inputValue: e.currentTarget.value.trim(),
      stackArr: [...stack.arr()],
    });
  };

  const peak = () => {
    return stack.peak();
  };

  const push = async (item: string) => {
    stack.push(item);
    await delay(SHORT_DELAY_IN_MS);
    setValues({
      currentIndex: stack.getLength() - 1,
      stackArr: [...stack.arr()],
      loaderAdd: true,
    });
    await delay(SHORT_DELAY_IN_MS);
    setValues({
      currentsIndex: 0,
      stackArr: [...stack.arr()],
    });
  };

  const pop = async () => {
    setValues({
      currentIndex: stack.getLength() - 1,
      loaderDel: true,
      stackArr: [...stack.arr()],
    });
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    await delay(SHORT_DELAY_IN_MS);
    setValues({ stackArr: [...stack.arr()] });
  };

  const clear = () => {
    stack.clear();
    setValues({
      stackArr: [],
      currentIndex: 0,
    });
  };

  const clearedArray = values.stackArr?.reduce(
    (sum: number, item: string): any => sum + item,
    0
  );

  return (
    <SolutionLayout title="Стек">
      <form
        className={StackPageStyles.container}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          placeholder={"Введите текст"}
          isLimitText={true}
          maxLength={4}
          type={"text"}
          onChange={handleInput}
          value={values.inputValue || ""}
        />
        <div className={StackPageStyles.buttons}>
          <Button
            text={"Добавить"}
            extraClass={"button-style"}
            onClick={() => push(values.inputValue)}
            disabled={!Boolean(values.inputValue)}
            isLoader={values.loaderAdd}
            id="addBtn"
          />
          <Button
            text={"Удалить"}
            extraClass={"button-style"}
            onClick={() => pop()}
            disabled={clearedArray === 0 || !Boolean(values.stackArr)}
            isLoader={values.loaderDel}
            id="removeBtn"
          />
          <Button
            text={"Очистить"}
            extraClass={"button-style"}
            onClick={() => clear()}
            disabled={clearedArray === 0 || !Boolean(values.stackArr)}
            id="resetBtn"
          />
        </div>
      </form>
      <ul className={StackPageStyles.circles}>
        {values.stackArr?.map((item, i: number) => {
          return (
            <li className={`${StackPageStyles.circle}`} key={i}>
              <Circle
                index={i}
                letter={item}
                head={peak() === i ? "top" : ""}
                state={
                  i === values.currentIndex
                    ? ElementStates.Changing
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
