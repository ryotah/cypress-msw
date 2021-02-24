import { rest } from "msw";

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: "Mocked by MSW",
        completed: true
      })
    );
  })
];
