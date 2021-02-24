# cypress-msw

Demo of Cypress with MSW

## Project setup

```
npm ci
```

### Run the demo application

```
npm run serve
```

MSW will also work. You can see the message **"[MSW] Mocking enabled."** on your console if MWS works correctly.

MSW will mock only this endpoint, `https://jsonplaceholder.typicode.com/todos/1`.

### Run Cypress

You need to run the demo before running Cypress.

```
npm run cypress:open
```

The test code is [here](./cypress/integration/foo.spec.js).

### Override MSW responses from Cypress

Like the docs, [use() - Api - Mock Service Worker Docs](https://mswjs.io/docs/api/setup-worker/use#examples), are saying, we can control MSW from Cypress.

As an example:

```js
// ./src/mocks/browser.js
window.msw = {
  worker,
  rest
};
```

```js
// ./cypress/integration/foo.spec.js
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
```
