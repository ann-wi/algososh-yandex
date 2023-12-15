import { FormEvent, useState, FC } from "react";
import { swapString } from "../../utils/String";
import StringPageStyles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [reversedArr, setReversedArr] = useState<string[]>([]);
  const [isLoad, setLoad] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.currentTarget.value.trim());
  };

  const setCircle = (index: number, currentIndex: number, arr: string[]) => {
    let arrLength = arr.length - 1;
    if (currentIndex < index || currentIndex > arrLength - index) {
      return ElementStates.Modified;
    }
    if (currentIndex === index || currentIndex === arrLength - index) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  const reverseString = async (item: string) => {
    setLoad(true);
    const modifiedString = item.split("");

    setCurrentIndex(0);
    setReversedArr([...modifiedString]);

    await delay(SHORT_DELAY_IN_MS);
    for (let i = 0; i < Math.floor(modifiedString.length / 2); i++) {
      swapString(modifiedString, i, modifiedString.length - 1);
      setCurrentIndex((i: number) => i + 1);
      setReversedArr([...modifiedString]);
      await delay(DELAY_IN_MS);
    }
    setCurrentIndex((i: number) => i + 1);
    setLoad(false);
    return modifiedString;
  };

  const startReversing = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    reverseString(inputString);
    setInputString("");
  };

  return (
    <SolutionLayout title="Строка">
      <form className={StringPageStyles.form} onSubmit={startReversing}>
        <div className={StringPageStyles.container}>
          <Input
            placeholder="Введите текст"
            value={inputString || ""}
            onChange={handleChange}
            isLimitText={true}
            maxLength={11}
          />
          <Button
            text="Развернуть"
            onClick={startReversing}
            disabled={!inputString}
            extraClass={"button-style"}
            isLoader={isLoad}
            id="reverseBtn"
          />
        </div>
        <ul className={StringPageStyles.circleList}>
          {reversedArr &&
            reversedArr?.map((item, i: number) => {
              return (
                <li className={StringPageStyles.circle} key={i}>
                  <Circle
                    letter={item}
                    index={i}
                    state={setCircle(currentIndex, i, reversedArr)}
                  />
                </li>
              );
            })}
        </ul>
      </form>
    </SolutionLayout>
  );
};
