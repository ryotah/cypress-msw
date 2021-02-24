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
