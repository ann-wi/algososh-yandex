import React, { useState, FormEvent } from "react";
import FibonacciPageStyles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../utils/hooks/useForm";

type TFibValues = {
  values: {
    inputValue: number;
    fibArr: number[];
    loader: boolean;
    end: string;
  };
  setValues: (arg: any) => void;
};

export const FibonacciPage: React.FC = () => {
  const { values, setValues }: TFibValues = useForm({
    inputValue: null,
    fibArr: [],
    loader: false,
  });

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setValues({ inputValue: e.currentTarget.value });
  };

  const calcFibonacci = (value: number) => {
    //const toNumber = Number(value);
    const defArray = [0, 1];

    for (let i = 2; i < value; i++) {
      const res = defArray[i - 1] + defArray[i - 2];
      defArray.push(res);
    }

    return defArray;
  };

  const getFibonacci = async (value: number) => {
    let result = calcFibonacci(value);

    for (let i = 0; i <= result.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setValues({ fibArr: result.slice(0, i + 1), loader: true });
    }
    console.log(values.fibArr);
    setValues({ inputValue: null, loader: false });
  };

  const minimalInputValue = 1;
  const maxInputValue = 19;

  const limitedInputValues = !(
    minimalInputValue <= values.inputValue && values.inputValue <= maxInputValue
  );

  const startFibonacci = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    getFibonacci(values.inputValue);
    setValues({ inputValue: null });
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={FibonacciPageStyles.form} onSubmit={startFibonacci}>
        <div className={FibonacciPageStyles.container}>
          <Input
            placeholder={"Введите число"}
            isLimitText={true}
            maxLength={2}
            type={"num"}
            onChange={handleChange}
            value={values.inputValue || ""}
            max={19}
          />
          <Button
            text={"Рассчитать"}
            extraClass={"button-style"}
            onClick={startFibonacci}
            isLoader={values.loader}
            disabled={limitedInputValues}
          />
        </div>
        <div className={FibonacciPageStyles.circles}>
          {values.fibArr &&
            values.fibArr.map((item, i: number) => {
              <Circle key={i} letter={String(item)} />;
            })}
        </div>
      </form>
    </SolutionLayout>
  );
};
