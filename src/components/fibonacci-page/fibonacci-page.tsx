import React, { useState, FormEvent } from "react";
import FibonacciPageStyles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [fibResult, setFibResult] = useState<string[]>([]);

  // make it accept only numbers not bigger than 19

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };

  const calcFibonacci = (number: string) => {
    const toNumber = Number(number);
    const defArray = ["0", "1"];

    for (let i = 2; i < toNumber; i++) {
      const res = Number(defArray[i - 1]) + Number(defArray[i - 2]);
      defArray.push(String(res));
    }

    return defArray;
  };

  const getFibonacci = async () => {
    let result: string[] = calcFibonacci(inputValue);

    for (let i = 0; i <= result.length; i++) {
      // await
      setFibResult(result.slice(0, i + 1));
    }
  };

  const startFibonacci = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    getFibonacci();
    console.log(fibResult);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={FibonacciPageStyles.form}>
        <div className={FibonacciPageStyles.container}>
          <Input
            placeholder={"Введите число"}
            isLimitText={true}
            maxLength={2}
            type={"num"}
            onChange={handleChange}
            value={inputValue}
            max={19}
          />
          <Button
            text={"Рассчитать"}
            extraClass={"button-style"}
            onClick={startFibonacci}
          />
        </div>
      </form>
    </SolutionLayout>
  );
};
