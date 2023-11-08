import React, { FormEvent, useState } from "react";
import StringPageStyles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [reversedArr, setReversedArr] = useState<string[]>([]);

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputString(e.currentTarget.value.trim());
  };

  const swapString = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    [arr[firstIndex], arr[secondIndex - firstIndex]] = [
      arr[secondIndex - firstIndex],
      arr[firstIndex],
    ];
  };

  const reverseString = async (item: string) => {
    // delete spaces from a string
    const modifiedString = item.split("");

    //
    setCurrentIndex(0);
    setReversedArr([...modifiedString]);

    // await delay()
    for (let i = 0; i < Math.floor(modifiedString.length / 2); i++) {
      swapString(modifiedString, i, modifiedString.length - 1);
      setCurrentIndex((i: number) => i + 1);
      setReversedArr([...modifiedString]);
      //await delay
    }
    setCurrentIndex((i: number) => i + 1);
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
      <form
        className={StringPageStyles.form}
        onSubmit={() => console.log("string sort")}
      >
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
          />
        </div>
        <ul className={StringPageStyles.circleList}>
          {reversedArr &&
            reversedArr?.map((item, index: number) => {
              console.log(item);
            })}
        </ul>
      </form>
    </SolutionLayout>
  );
};
