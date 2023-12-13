import {
  CY_INPUT,
  CY_SUBMIT_BTN,
  CY_FORM,
  CIRCLES,
  BASE_URL,
} from "../../test-constants/test-constants";

import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("testing the correct operation of the sting reversal component", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.get("[href='/recursion']").click();
    cy.location("pathname").should("eq", "/recursion");
  });

  it("inaccessibility of the submit button when the input value is empty", () => {
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).should("have.value", "");
      cy.get(CY_SUBMIT_BTN).should("be.disabled");
    });
  });

  it("checking correct string reversal", () => {
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

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLES).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(item[0]).children().should("have.text", "t");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(item[1]).children().should("have.text", "e");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(item[2]).children().should("have.text", "s");
      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(item[3]).children().should("have.text", "t");
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLES).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(item[0]).children().should("have.text", "t");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(item[1]).children().should("have.text", "s");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(item[2]).children().should("have.text", "e");
      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(item[3]).children().should("have.text", "t");
    });
  });
});
