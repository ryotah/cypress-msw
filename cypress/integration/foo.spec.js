describe("foo", () => {
  it("should get todo data", () => {
    cy.visit("/foo");
    cy.intercept("https://jsonplaceholder.typicode.com/todos/1");
  });
});
