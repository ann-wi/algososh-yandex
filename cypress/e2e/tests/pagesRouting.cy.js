import { BASE_URL } from "../../test-constants/test-constants";

describe("Pages routing testing", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
  });
  it("Recursion", function () {
    cy.get("[href='/recursion']").click();
    cy.location("pathname").should("eq", "/recursion");
    cy.contains("Строка");
    cy.contains("К оглавлению").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });
  it("Fibonacci", function () {
    cy.get("[href='/fibonacci']").click();
    cy.location("pathname").should("eq", "/fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.contains("К оглавлению").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });
  it("Sorting", function () {
    cy.get("[href='/sorting']").click();
    cy.location("pathname").should("eq", "/sorting");
    cy.contains("Сортировка массива");
    cy.contains("К оглавлению").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });
  it("Stack", function () {
    cy.get("[href='/stack']").click();
    cy.location("pathname").should("eq", "/stack");
    cy.contains("Стек");
    cy.contains("К оглавлению").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });
  it("Queue", function () {
    cy.get("[href='/queue']").click();
    cy.location("pathname").should("eq", "/queue");
    cy.contains("Очередь");
    cy.contains("К оглавлению").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });
  it("List", function () {
    cy.get("[href='/list']").click();
    cy.location("pathname").should("eq", "/list");
    cy.contains("Связный список");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
    cy.location("pathname").should("eq", "/");
  });
});
