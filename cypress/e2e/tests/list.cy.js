import {
  CIRCLE_BOX,
  BASE_URL,
  CIRCLE,
} from "../../test-constants/test-constants";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("Тесты на функциональность страницы 'Лист'", function () {
  const CHANGING_COLOR = "rgb(210, 82, 225)";
  const INITIAL_COLOR = "rgb(127, 224, 81)";
  const DEFAULT_COLOR = "rgb(0, 50, 255)";

  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/list']").click();
    cy.location("pathname").should("eq", "/list");
    cy.get("input[placeholder='Введите текст']").as("inputText");
    cy.get("input[placeholder='Введите индекс']").as("inputIndex");
    cy.get("button").eq(1).as("addBtnHead");
    cy.get("button").eq(2).as("addBtnTail");
    cy.get("button").eq(3).as("removeBtnHead");
    cy.get("button").eq(4).as("removeBtnTail");
    cy.get("button").eq(5).as("addBtnIndex");
    cy.get("button").eq(6).as("removeBtnIndex");
    cy.get(CIRCLE_BOX).as("circles");
  });

  it("Корректное отображение кнопок при пустом инпуте", function () {
    cy.get("@inputText").should("be.empty");
    cy.get("@inputIndex").should("be.empty");
    cy.get("@addBtnHead").should("be.disabled");
    cy.get("@addBtnTail").should("be.disabled");
    cy.get("@addBtnIndex").should("be.disabled");
    cy.get("@removeBtnIndex").should("be.disabled");
    cy.get("@removeBtnHead").should("be.enabled");
    cy.get("@removeBtnTail").should("be.enabled");
  });

  it("Корректное отображение стартового списка", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").should("have.length", 3);
    cy.get("@circles").find(CIRCLE).as("circle");
    cy.get("@circle").should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("@circles").eq(0).contains(0);
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(1).contains(1);
    cy.get("@circles").eq(2).contains(2);
    cy.get("@circles").eq(2).contains("tail");
  });

  it("Корректное добавление в head", function () {
    const checkCircleColor = (index, color) => {
      cy.get("@circles")
        .eq(index)
        .find(CIRCLE)
        .should("have.css", "border-color", color);
    };

    cy.get("@inputText").type(24);
    cy.get("@addBtnHead").should("be.enabled").click();

    checkCircleColor(0, CHANGING_COLOR);
    cy.get("@circles").eq(0).should("contain", 24);

    checkCircleColor(0, INITIAL_COLOR);

    cy.get("@circles").should("have.length", 4);

    checkCircleColor(0, DEFAULT_COLOR);

    cy.get("@circles").eq(0).should("contain", 24);
    cy.get("@circles").eq(0).should("contain", "head");
  });

  it("Корректное добавление в tail", function () {
    const checkCircleAtIndex = (index, color, content) => {
      cy.get("@circles")
        .eq(index)
        .find(CIRCLE)
        .should("have.css", "border-color", color)
        .and("contain", content);
    };

    cy.get("@inputText").type(24);
    cy.get("@addBtnTail").should("be.enabled").click();

    checkCircleAtIndex(3, CHANGING_COLOR, 24);

    cy.get("@circles").should("have.length", 5);

    checkCircleAtIndex(4, INITIAL_COLOR, 24);

    checkCircleAtIndex(4, DEFAULT_COLOR, 24);
    cy.get("@circles").eq(4).should("contain", "tail");
  });

  it("Корректное удаление эл-та из head", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@inputText").type(24);
    cy.get("@addBtnHead").should("be.enabled").click();
    cy.get("@circles").should("have.length", 4);
    cy.get("@removeBtnHead").should("be.enabled").click();
    cy.get("@circles")
      .eq(0)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").should("have.length", 3);
    cy.get("@circles").eq(0).contains(0);
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles")
      .eq(0)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
  });

  it("Корректное удаление эл-та из tail", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@inputText").type(24);
    cy.get("@addBtnTail").should("be.enabled").click();
    cy.get("@circles").should("have.length", 4);
    cy.get("@removeBtnTail").should("be.enabled").click();
    cy.get("@circles")
      .eq(4)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("@circles").should("have.length", 3);
    cy.get("@circles").eq(3).contains(3);
    cy.get("@circles").eq(3).contains("tail");
    cy.get("@circles")
      .eq(3)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
  });

  it("Корректное добавление эл-та по индексу", function () {
    cy.get("@inputText").type(24);
    cy.get("@inputIndex").type(2);
    cy.get("@circles").should("have.length", 3);
    cy.get("@addBtnIndex").should("be.enabled").click();
    cy.get("@circles")
      .eq(0)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles")
      .eq(0)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(0).contains(0);
    cy.get("@circles")
      .eq(1)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("@circles").eq(1).contains(24);
    cy.get("@circles")
      .eq(1)
      .find(CIRCLE)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains(1);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").eq(2).contains(24);
    cy.get("@circles").should("have.length", 4);
  });

  it("Корректное удаление эл-та по индексу", function () {
    cy.get("@inputIndex").type(2);
    cy.get("@circles").should("have.length", 3);
    cy.get("@removeBtnIndex").should("be.enabled").click();
    cy.get("@circles").eq(2).contains(2);
  });
});
