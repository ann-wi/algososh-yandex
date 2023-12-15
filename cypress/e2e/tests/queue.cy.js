import {
  BASE_URL,
  CY_FORM,
  CY_INPUT,
  CY_RESET_BTN,
  CY_REMOVE_BTN,
  CIRCLES,
  CIRCLE_CONTENT,
  CY_ADD_BTN,
} from "../../test-constants/test-constants";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("Testing Queue page", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.get("[href='/queue']").click();
    cy.location("pathname").should("eq", "/queue");
  });

  it("Buttons disabled if input is empty", () => {
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).should("have.value", "");
      cy.get("button").should("be.disabled");
      cy.get(CY_REMOVE_BTN).should("be.disabled");
      cy.get(CY_RESET_BTN).should("be.disabled");
    });
  });

  it("Element added to queue correctly", () => {
    cy.get(CY_INPUT).type("a");
    cy.get(CY_ADD_BTN).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type("b");
    cy.get(CY_ADD_BTN).click();

    cy.get(CIRCLE_CONTENT).eq(0).contains("head");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES).contains("b");

    cy.get(CIRCLE_CONTENT).eq(1).contains("tail");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type("c");
    cy.get(CY_ADD_BTN).click();
    cy.get(CIRCLE_CONTENT).eq(0).contains("head");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_CONTENT).eq(2).contains("tail");
  });

  it("Element removed from queue correctly", () => {
    cy.get(CY_INPUT).type("a");
    cy.get(CY_ADD_BTN).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type("b");
    cy.get(CY_ADD_BTN).click();
    cy.get(CIRCLE_CONTENT).eq(0).contains("head");
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_CONTENT).eq(1).contains("tail");

    cy.get(CY_INPUT).type("1");
    cy.get(CY_REMOVE_BTN).click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLES)
      .first()
      .should(($div) => {
        expect($div).to.have.text("");
      })
      .invoke("attr", "class");
  });

  it("Queue resets correctly", () => {
    cy.clock();
    cy.get(CY_INPUT).type("0");
    cy.get(CY_ADD_BTN).click();

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CY_INPUT).type("a");
    cy.get(CY_ADD_BTN).click();

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CY_INPUT).type("23");
    cy.get(CY_ADD_BTN).click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_RESET_BTN).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLES).each(($item) => {
      expect($item).to.have.text("");
    });
  });
});
