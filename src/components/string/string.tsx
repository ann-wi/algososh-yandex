import React, { useState } from "react";
import StringPageStyles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");

  return (
    <SolutionLayout title="Строка">
      <form
        className={StringPageStyles.form}
        onSubmit={() => console.log("string sort")}
      >
        <div className={StringPageStyles.container}>
          <Input placeholder="Введите текст" value={inputString || ""} />
          <Button />
        </div>
        <ul className={StringPageStyles.circleList}>
          <li className={StringPageStyles.circle}>
            <Circle />
          </li>
        </ul>
      </form>
    </SolutionLayout>
  );
};
