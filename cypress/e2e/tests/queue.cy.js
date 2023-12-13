import {
  BASE_URL,
  BUTTON,
  CHANGING_STATE,
  CIRCLE,
  CIRCLE_BOX,
  DEFAULT_STATE,
  RESET_BUTTON,
  SUBMIT_BUTTON,
} from "../../test-constants/test-constants";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe('Тесты страницы "Очередь"', function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/queue']").click();
    cy.location("pathname").should("eq", "/queue");
  });

  it("Кнопки выкл при пустом инпуте", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").clear();
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
    cy.get("button").eq(3).should("be.disabled");
  });

  it("Корректное добавление элемента", function () {
    const checkCircleProperties = (index) => {
      cy.get("@allCircle")
        .eq(index)
        .should("have.css", "border", CHANGING_STATE)
        .wait(SHORT_DELAY_IN_MS)
        .should("contain", index + 1)
        .and("have.css", "border", DEFAULT_STATE);
    };

    for (let i = 1; i < 4; i++) {
      cy.get("input").type(i);
      cy.get("button").eq(1).should("be.enabled").click();

      cy.get('[class^="queue-page_list"]')
        .find(CIRCLE_BOX)
        .find(CIRCLE)
        .as("allCircle");

      checkCircleProperties(i - 1);

      cy.get(`[class^="queue-page_list"] ${CIRCLE_BOX}:eq(0)`).should(
        "contain",
        "head"
      );

      cy.get(`[class^="queue-page_list"] ${CIRCLE_BOX}:eq(${i - 1})`).should(
        "contain",
        "tail"
      );
    }
  });

  it("Корректное удаление элемента", function () {
    const fillInputAndSubmit = (value) => {
      cy.get("input[type='text']").type(value);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
      cy.wait(SHORT_DELAY_IN_MS);
    };

    for (let i = 1; i < 4; i++) {
      fillInputAndSubmit(i);
    }

    cy.get(`${BUTTON}[class^="text"]`).should("not.be.disabled").click();
    cy.get('[class^="queue-page_list"]')
      .find(CIRCLE_BOX)
      .find(CIRCLE)
      .as("allCircle");

    cy.get("@allCircle")
      .eq(0)
      .should("have.css", "border", CHANGING_STATE)
      .wait(SHORT_DELAY_IN_MS)
      .should("contain", "");

    cy.get(`[class^="queue-page_list"] ${CIRCLE_BOX}:eq(1)`).should(
      "contain",
      "head"
    );
  });

  it("Корректная очистка очереди", function () {
    const fillInputAndSubmit = (value) => {
      cy.get("input").type(value);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
      cy.wait(SHORT_DELAY_IN_MS);
    };

    for (let i = 1; i < 4; i++) {
      fillInputAndSubmit(i);
    }

    cy.get(RESET_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="queue-page_list"]')
      .find(CIRCLE_BOX)
      .find(CIRCLE)
      .should("contain", "");
  });
});
