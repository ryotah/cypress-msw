describe("foo", () => {
  beforeEach(() => {
    cy.intercept("https://jsonplaceholder.typicode.com/todos/", {
      fixture: "todo"
    }).as("todo");
  });
  it("should get todo data", () => {
    cy.visit("/#/foo");
    cy.contains("Mocked by MSW");

    // We cannot wait the request here because the first request (todos/1) is mocked by MSW
    // cy.wait("@todo")

    // Fetch another todo
    cy.get("input")
      .clear()
      .type("2");
    cy.get("button").click();

    // Assert the title
    cy.contains("Mocked by Cypress");
    cy.wait("@todo")
      .its("request.url")
      .should("equal", "https://jsonplaceholder.typicode.com/todos/2");
  });
});
