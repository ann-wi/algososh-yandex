import {
  BASE_URL,
  CY_INPUT,
  CY_SUBMIT_BTN,
  CY_FORM,
  CIRCLES,
  CIRCLE_BOX,
} from "../../test-constants/test-constants";

import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("Проверка алгоритмов на странице 'Строка'", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/recursion']").click();
    cy.location("pathname").should("eq", "/recursion");
  });

  it("Проверка доступности кнопки при пустом инпуте", function () {
    cy.get("input").should("have.value", "");
    cy.get("button").eq(1).should("be.disabled");
  });

  it("Проверка корректности разворота строки", function () {
    cy.clock();
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).type("test");
      cy.get(CY_SUBMIT_BTN).click();
    });

    cy.get(CIRCLES).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(item[0]).children().should("have.text", "t");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(item[1]).children().should("have.text", "e");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(item[2]).children().should("have.text", "s");
      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(item[3]).children().should("have.text", "t");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_BOX).as("circles").should("have.length", 4);
    cy.wait(SHORT_DELAY_IN_MS);
  });
});
