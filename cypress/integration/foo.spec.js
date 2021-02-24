const API_URL = "https://jsonplaceholder.typicode.com/";

describe("foo", () => {
  beforeEach(() => {
    cy.intercept(`${API_URL}todos/`, {
      fixture: "todo"
    }).as("todo");
    cy.visit("/#/foo");
  });
  it("should get todo data", () => {
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
      .should("equal", `${API_URL}todos/2`);
  });
  it("should get todo data - MSW will be overridden", () => {
    cy.window().then(window => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get(`${API_URL}todos/1`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              id: 1,
              title: "Mocked by not MSW but Cypress",
              completed: true
            })
          );
        })
      );
    });
    // Assert that the title is not "Mocked by MSW"
    cy.contains("Mocked by not MSW but Cypress");
  });
});
