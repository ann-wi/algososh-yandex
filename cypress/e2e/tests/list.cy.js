import {
  CIRCLE_BOX,
  BASE_URL,
  CIRCLE,
  CY_FORM,
  CY_LIST_INPUT,
  CY_INDEX_REMOVE_BTN,
  CY_LIST_INDEX_INPUT,
  CY_HEAD_ADD_BTN,
  CY_INDEX_ADD_BTN,
  CY_HEAD_REMOVE_BTN,
  CY_TAIL_ADD_BTN,
  CY_TAIL_REMOVE_BTN,
  CIRCLES,
  CY_CIRCLE_HEAD,
  CY_CIRCLE_TAIL,
} from "../../test-constants/test-constants";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../../src/constants/delays";

describe("testing the correct operation of the list component", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.get("[href='/list']").click();
    cy.location("pathname").should("eq", "/list");
  });

  it("inaccessibility of the submit button when the input value is empty", () => {
    cy.get("form").within(() => {
      cy.get("input[placeholder='Введите текст']").should("have.value", "");
      cy.get("button").should("be.disabled");
      cy.get("button").should("be.disabled");
    });
  });

  it("checking the rendering of the default list", () => {
    cy.get(CIRCLES)
      .should("have.length", 3)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
    cy.get(CY_CIRCLE_HEAD)
      .first()
      .should(($div) => {
        expect($div).to.have.text("head");
      });
    cy.get(CY_CIRCLE_TAIL)
      .eq(2)
      .should(($div) => {
        expect(CIRCLE).to.have.text("tail");
      });
    cy.get(CIRCLES).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[2]).children().should("have.text", "8");
      cy.get(item[3]).children().should("have.text", "1");
    });
    cy.wait(Number(DELAY_IN_MS));
  });

  it("checking the correct addition of the item to the head", () => {
    cy.get(CY_LIST_INPUT).type("0");
    cy.get(CY_HEAD_ADD_BTN).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));
    cy.get(CIRCLES).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
    });
    cy.wait(Number(DELAY_IN_MS));
  });

  it("checking the correct addition of the item to the tail", () => {
    cy.get(CY_LIST_INPUT).type("9");
    cy.get(CY_TAIL_ADD_BTN).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));
    cy.get(CIRCLES).then((item) => {
      cy.get(item[4]).children().should("have.text", "9");
      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
    });
    cy.wait(Number(DELAY_IN_MS));
  });

  it("checking correct removal of the item from the head", () => {
    cy.get(CY_HEAD_REMOVE_BTN).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));
    cy.get(CIRCLES).then((item) => {
      cy.get(item[0]).children().should("have.text", "34");
      cy.get(item[1]).children().should("have.text", "8");
      cy.get(item[2]).children().should("have.text", "1");
    });
    cy.wait(Number(DELAY_IN_MS));
  });

  it("checking correct removal of the item from the tail", () => {
    cy.get(CY_TAIL_REMOVE_BTN).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));
    cy.get(CIRCLES).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[2]).children().should("have.text", "8");
    });
    cy.wait(Number(DELAY_IN_MS));
  });

  it("check for adding an item by index", () => {
    cy.get(CY_LIST_INDEX_INPUT).type(2);
    cy.get(CY_LIST_INPUT).type("4");
    cy.get(CY_INDEX_ADD_BTN).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));
    cy.get(CIRCLES).then((item) => {
      cy.get(item[0]).children().should("have.text", "4");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(item[1]).children().should("have.text", "0");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(item[2]).children().should("have.text", "34");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
    });
  });

  it("check for removing an item by index", () => {
    cy.get(CY_LIST_INDEX_INPUT).type(2);
    cy.get(CY_INDEX_REMOVE_BTN).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));
    cy.get(CIRCLES).then((item) => {
      cy.get(item[0]).children().should("have.text", "0");
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.wait(Number(SHORT_DELAY_IN_MS));
      cy.get(item[1]).children().should("have.text", "34");
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.wait(Number(SHORT_DELAY_IN_MS));
      cy.get(item[2]).children().should("have.text", "1");
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
    });
  });
});
