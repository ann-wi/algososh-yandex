import TestRenderer from "react-test-renderer";
import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";
import { Direction } from "../../../types/direction";

describe("Проверка кнопки", () => {
  let tree;
  const renderSnapshot = (component: any) =>
    TestRenderer.create(component).toJSON();

  describe("Снапшоты", () => {
    it.each([
      [<Button text="Текст кнопки" />, "Кнопка с текстом"],
      [<Button />, "Кнопка без текста"],
      [<Button disabled />, "Кнопка disabled"],
      [<Button isLoader />, "Индикатор загрузки кнопки"],
      [<Button sorting={Direction.Ascending} />, "Проверка btn Asc"],
      [<Button sorting={Direction.Descending} />, "Проверка кнопки Des"],
      [<Button linkedList="big" />, "Кнопка big"],
      [<Button linkedList="small" />, "Кнопка small"],
    ])("создает корректный снапшот для %s", (component, description) => {
      tree = renderSnapshot(component);
      expect(tree).toMatchSnapshot();
    });
  });

  // Функциональные тесты
  it("Колбэк кнопки", () => {
    const callBack = jest.fn();
    render(<Button onClick={callBack} />);
    fireEvent.click(screen.getByRole("button"));
    expect(callBack).toHaveBeenCalled();
  });
});
