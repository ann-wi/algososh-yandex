import {
  BASE_URL,
  CIRCLE_BOX,
  CIRCLE,
} from "../../test-constants/test-constants";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("Страница Стек работает корректно", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/stack']").click();
    cy.location("pathname").should("eq", "/stack");
  });

  it("Кнопки выкл при пустом инпуте", function () {
    cy.get("input").should("have.value", "");
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
    cy.get("button").eq(3).should("be.disabled");
  });

  it("Добавление эл-та происходит корректно", function () {
    // Вводим значение и нажимаем кнопку
    cy.get("input").type(1);
    cy.get("button").eq(1).should("be.enabled").click();

    // Проверяем начальное состояние круга
    cy.get(CIRCLE_BOX)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(1);

    // Ожидаем и проверяем измененное состояние круга
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_BOX)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains(1);
  });

  it("Удаление эл-та происходит корректно", function () {
    // Добавляем два элемента
    [1, 2].forEach((value) => {
      cy.get("input").type(value);
      cy.get("button").eq(1).should("be.enabled").click();
    });

    // Проверяем, что два элемента добавлены
    cy.get(CIRCLE_BOX).should("have.length", 2);

    // Удаляем последний элемент
    cy.get("button").eq(2).should("be.enabled").click();

    // Проверяем изменение внешнего вида удаляемого элемента перед его удалением
    cy.get(CIRCLE_BOX)
      .find(CIRCLE)
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(2);

    // Ожидаем и проверяем, что один элемент был удален
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_BOX).should("have.length", 1);

    // Проверяем, что кнопка удаления все еще активна
    cy.get("button").eq(2).should("be.enabled");
  });

  it("Очистка эл-тов происходит корректно", function () {
    // Добавляем два элемента
    [1, 2].forEach((value) => {
      cy.get("input").type(value);
      cy.get("button").eq(1).should("be.enabled").click();
    });

    // Очищаем все элементы
    cy.get("button").eq(3).should("be.enabled").click();

    // Проверяем, что элементы были удалены
    cy.get(CIRCLE_BOX).should("not.exist");

    // Проверяем состояние кнопок
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
    cy.get("button").eq(3).should("be.disabled");
  });
});
