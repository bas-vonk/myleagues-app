// https://docs.cypress.io/api/introduction/api.html

describe("Visit the login page.", () => {
  it("Visits the login page.", () => {
    cy.visit("/");
    cy.contains("MYLEAGUES");
  });
});
