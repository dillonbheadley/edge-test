import Layout from "../components/Layout.js";
import TodoApp from "../components/TodoApp.js";
import { html } from "../utils.js";

export const config = { path: "/" };

export default (req, context) => {
  const count = context.cookies.get("count") || "0";

  const todos = context.cookies.get("todos")
    ? JSON.parse(atob(context.cookies.get("todos")))
    : [];

  const body = html`
    <${Layout} title="Hello world" description="a test">
      <h1>hello world</h1>
      <button type="button" hx-post="/count">Click: ${count}</button>
      <${TodoApp} todos=${todos} />
    <//>
  `;

  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
};
