# cypress-msw

Demo of Cypress with MSW

## Project setup

```
npm ci
```

## Run the demo application

```
npm run serve
```

MSW will also work. You can see the message **"[MSW] Mocking enabled."** on your console if MWS works correctly.

MSW will mock only this endpoint, `https://jsonplaceholder.typicode.com/todos/1`.

## Run Cypress

You need to run the demo before running Cypress.

```
npm run cypress:open
```

The test code is [here](./cypress/integration/foo.spec.js).

## Notes

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

### Comparison

References:

- https://mswjs.io/docs/comparison
- https://miragejs.com/docs/comparison-with-other-tools/

Comparison of MSW and Mirage:

- https://mswjs.io/docs/comparison#miragejs
  - > MirageJS has a focus on data relation during mocking. Mock Service Worker, on the other hand, conducts API mocking on per-transaction basis, making mocking a matter of request-response relation.
- https://miragejs.com/docs/comparison-with-other-tools/#msw
  - > the main difference is that MSW uses a Service Worker to intercept network requests, whereas Mirage uses Pretender.js which works by monkey-patching window.fetch and window.XMLHttpRequest.
  - > The main advantage of using a Service Worker is that requests are shown in the Network tab of the DevTools
- https://github.com/miragejs/miragejs/issues/449
