import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import {
  BASE_URL,
  CIRCLE_CONTENT,
  CY_FIBONACCI_BTN,
  CY_INPUT,
  CIRCLE,
} from "../../test-constants/test-constants";

describe("Fibonacci Algorithm testing", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/fibonacci']").click();
    cy.location("pathname").should("eq", "/fibonacci");
  });

  it("Button is disabled if input is empty", function () {
    cy.get(CY_INPUT).should("have.value", "");
    cy.get(CY_FIBONACCI_BTN).should("be.disabled");
  });

  it("Fibonacci works correctly", function () {
    cy.get(CY_INPUT).type(5);
    cy.get(CY_FIBONACCI_BTN).click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_CONTENT).find(CIRCLE).eq(0).contains(0);
    cy.get(CIRCLE_CONTENT).find(CIRCLE).eq(1).contains(1);
    cy.get(CIRCLE_CONTENT).find(CIRCLE).eq(2).contains(1);
    cy.get(CIRCLE_CONTENT).find(CIRCLE).eq(3).contains(2);
    cy.get(CIRCLE_CONTENT).find(CIRCLE).eq(4).contains(3);
    cy.get(CIRCLE_CONTENT).find(CIRCLE).eq(5).contains(5);

    cy.get(CIRCLE_CONTENT).as("circles").should("have.length", 6);
  });
});
