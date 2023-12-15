import {
  BASE_URL,
  CIRCLE,
  CY_ADD_BTN,
  CY_INPUT,
  CY_REMOVE_BTN,
  CY_RESET_BTN,
  CIRCLE_CONTENT,
} from "../../test-constants/test-constants";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("Testing Stack page", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/stack']").click();
    cy.location("pathname").should("eq", "/stack");
  });

  it("Buttons disabled if input is empty", function () {
    cy.get(CY_INPUT).should("have.value", "");
    cy.get(CY_ADD_BTN).should("be.disabled");
    cy.get(CY_REMOVE_BTN).should("be.disabled");
    cy.get(CY_RESET_BTN).should("be.disabled");
  });

  it("Element added correctly", function () {
    cy.get(CY_INPUT).type(1);
    cy.get(CY_ADD_BTN).should("be.enabled").click();

    cy.get(CIRCLE_CONTENT).find(CIRCLE).contains(1);
  });

  it("Element removed correctly", function () {
    cy.get(CY_INPUT).type(1);
    cy.get(CY_ADD_BTN).should("be.enabled").click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type(2);
    cy.get(CY_ADD_BTN).should("be.enabled").click();

    cy.get(CIRCLE_CONTENT).should("have.length", 2);

    cy.get(CY_REMOVE_BTN).should("be.enabled").click();

    cy.get(CIRCLE_CONTENT).find(CIRCLE).eq(1).contains(2);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_CONTENT).should("have.length", 1);

    cy.get(CY_REMOVE_BTN).should("be.enabled");
  });

  it("Stack resets correctly", function () {
    cy.get(CY_INPUT).type(1);
    cy.get(CY_ADD_BTN).should("be.enabled").click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type(2);
    cy.get(CY_ADD_BTN).should("be.enabled").click();

    cy.get(CY_RESET_BTN).should("be.enabled").click();

    cy.get(CIRCLE_CONTENT).should("not.exist");

    cy.get(CY_ADD_BTN).should("be.disabled");
    cy.get(CY_REMOVE_BTN).should("be.disabled");
    cy.get(CY_RESET_BTN).should("be.disabled");
  });
});
