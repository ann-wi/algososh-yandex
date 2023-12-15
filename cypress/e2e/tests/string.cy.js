import {
  BASE_URL,
  CY_INPUT,
  CY_REVERSE_BTN,
  CY_FORM,
  CIRCLES,
  CIRCLE_CONTENT,
} from "../../test-constants/test-constants";

import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("Testing String Reverse page", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/recursion']").click();
    cy.location("pathname").should("eq", "/recursion");
  });

  it("Reverse button is disabled if input is empty", function () {
    cy.get(CY_INPUT).should("have.value", "");
    cy.get(CY_REVERSE_BTN).should("be.disabled");
  });

  it("String is reversed correctly", function () {
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).type("test");
      cy.get(CY_REVERSE_BTN).click();
    });

    cy.get(CIRCLES).then((item) => {
      cy.get(item[0]).children().should("have.text", "t");
      cy.get(item[1]).children().should("have.text", "e");
      cy.get(item[2]).children().should("have.text", "s");
      cy.get(item[3]).children().should("have.text", "t");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_CONTENT).should("have.length", 4);
  });
});
