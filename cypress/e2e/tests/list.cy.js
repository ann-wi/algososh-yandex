import {
  CIRCLE_CONTENT,
  BASE_URL,
  CIRCLE,
  CY_TEXT_INPUT,
  CY_INDEX_INPUT,
  CY_ADD_HEAD_BTN,
  CY_ADD_TAIL_BTN,
  CY_DEL_HEAD_BTN,
  CY_DEL_TAIL_BTN,
  CY_DEL_IDX_BTN,
  CY_ADD_IDX_BTN,
} from "../../test-constants/test-constants";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("Testing List page", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/list']").click();
    cy.location("pathname").should("eq", "/list");
  });

  it("Buttons disabled if inputs are empty", function () {
    cy.get(CY_TEXT_INPUT).should("be.empty");
    cy.get(CY_INDEX_INPUT).should("be.empty");
    cy.get(CY_ADD_HEAD_BTN).should("be.disabled");
    cy.get(CY_ADD_TAIL_BTN).should("be.disabled");
    cy.get(CY_DEL_IDX_BTN).should("be.disabled");
    cy.get(CY_ADD_IDX_BTN).should("be.disabled");
    cy.get(CY_DEL_HEAD_BTN).should("be.enabled");
    cy.get(CY_DEL_TAIL_BTN).should("be.enabled");
  });

  it("Initial list loaded correctly", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_CONTENT).should("have.length", 3);
    cy.get(CIRCLE_CONTENT).find(CIRCLE).as("circle");
    cy.get(CIRCLE_CONTENT).eq(0).contains(0);
    cy.get(CIRCLE_CONTENT).eq(0).contains("head");
    cy.get(CIRCLE_CONTENT).eq(1).contains(1);
    cy.get(CIRCLE_CONTENT).eq(2).contains("tail");
  });

  it("Element added to HEAD correctly", function () {
    cy.get(CY_TEXT_INPUT).type(24);
    cy.get(CY_ADD_HEAD_BTN).should("be.enabled").click();

    cy.get(CIRCLE_CONTENT).eq(0).should("contain", 24);

    cy.get(CIRCLE_CONTENT).should("have.length", 4);

    cy.get(CIRCLE_CONTENT).eq(0).should("contain", 24);
    cy.get(CIRCLE_CONTENT).eq(0).should("contain", "head");
  });

  it("Element added to TAIL correctly", function () {
    cy.get(CY_TEXT_INPUT).type(24);
    cy.get(CY_ADD_TAIL_BTN).should("be.enabled").click();

    cy.get(CIRCLE_CONTENT).eq(3).should("contain", 24);

    cy.get(CIRCLE_CONTENT).should("have.length", 4);

    cy.get(CIRCLE_CONTENT).eq(3).should("contain", 24);
    cy.get(CIRCLE_CONTENT).eq(3).should("contain", "tail");
  });

  it("Element removed from HEAD correctly", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CY_TEXT_INPUT).type(24);
    cy.get(CY_ADD_HEAD_BTN).should("be.enabled").click();
    cy.get(CIRCLE_CONTENT).should("have.length", 4);
    cy.get(CY_DEL_HEAD_BTN).should("be.enabled").click();
    cy.get(CIRCLE_CONTENT).eq(0).find(CIRCLE);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_CONTENT).should("have.length", 3);
    cy.get(CIRCLE_CONTENT).eq(0).contains(0);
    cy.get(CIRCLE_CONTENT).eq(0).contains("head");
    cy.get(CIRCLE_CONTENT).eq(0).find(CIRCLE);
  });

  it("Element removed from TAIL correctly", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CY_TEXT_INPUT).type(24);
    cy.get(CY_ADD_TAIL_BTN).should("be.enabled").click();
    cy.get(CIRCLE_CONTENT).should("have.length", 4);
    cy.get(CY_DEL_TAIL_BTN).should("be.enabled").click();
    cy.get(CIRCLE_CONTENT).eq(4).find(CIRCLE);
    cy.get(CIRCLE_CONTENT).should("have.length", 3);
    cy.get(CIRCLE_CONTENT).eq(2).contains(2);
    cy.get(CIRCLE_CONTENT).eq(2).contains("tail");
    cy.get(CIRCLE_CONTENT).eq(2).find(CIRCLE);
  });

  it("Element added by index correctly", function () {
    cy.get(CY_TEXT_INPUT).type(24);
    cy.get(CY_INDEX_INPUT).type(2);
    cy.get(CIRCLE_CONTENT).should("have.length", 3);
    cy.get(CY_ADD_IDX_BTN).should("be.enabled").click();
    cy.get(CIRCLE_CONTENT).eq(0).find(CIRCLE);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_CONTENT).eq(0).find(CIRCLE);
    cy.get(CIRCLE_CONTENT).eq(0).contains("head");
    cy.get(CIRCLE_CONTENT).eq(0).contains(0);
    cy.get(CIRCLE_CONTENT).eq(1).find(CIRCLE);
    cy.get(CIRCLE_CONTENT).eq(1).contains(24);
    cy.get(CIRCLE_CONTENT).eq(1).find(CIRCLE).contains(1);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_CONTENT).eq(2).contains(24);
    cy.get(CIRCLE_CONTENT).should("have.length", 4);
  });

  it("Element removed by index correctly", function () {
    cy.get(CY_INDEX_INPUT).type(2);
    cy.get(CIRCLE_CONTENT).should("have.length", 3);
    cy.get(CY_DEL_IDX_BTN).should("be.enabled").click();
    cy.get(CIRCLE_CONTENT).eq(2).contains(2);
  });
});
