import { BASE_URL } from "../../test-constants/test-constants";

describe("App Launch testing", function () {
  it(`App is available - ${BASE_URL}`, function () {
    cy.visit(BASE_URL);
  });
});
