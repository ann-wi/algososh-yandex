import {
  BASE_URL,
  CIRCLE_CONTENT,
  CY_FIBONACCI_BTN,
  CY_INPUT,
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

    cy.get(CIRCLE_CONTENT).as("circles").should("have.length", 2);
  });
});
