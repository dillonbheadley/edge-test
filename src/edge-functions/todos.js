import Todo from "../components/Todo.js";
import { html } from "../utils.js";

export const config = { path: "/todos" };

export function makeTodo(todo) {
  return html`<${Todo} todo=${todo} />`;
}

export default async (req, context) => {
  let todos = context.cookies.get("todos")
    ? JSON.parse(atob(context.cookies.get("todos")))
    : [];

  if (req.method === "GET") {
    const body = todos.map(makeTodo);
    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }

  if (req.method === "POST") {
    const data = await req.formData();

    if (!data) {
      return new Response("", {
        headers: { "content-type": "text/html" },
      });
    }
    const todo = {
      id: crypto.randomUUID(),
      title: data.get("new-todo"),
      done: false,
    };
    todos = [...todos, todo];

    context.cookies.set({
      name: "todos",
      value: btoa(JSON.stringify(todos)),
      httpOnly: true,
    });

    const body = makeTodo(todo);
    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }

  if (req.method === "PATCH") {
    const data = await req.formData();

    if (!data) {
      return new Response("", {
        headers: { "content-type": "text/html" },
      });
    }
    const todo = todos.find((todo) => todo.id === data.get("id"));

    todo.done = data.get("done");

    context.cookies.set({
      name: "todos",
      value: btoa(JSON.stringify(todos)),
      httpOnly: true,
    });

    const body = makeTodo(todo);
    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }

  if (req.method === "DELETE") {
    const data = await req.formData();

    if (!data) {
      return new Response("", {
        headers: { "content-type": "text/html" },
      });
    }

    todos = todos.filter((todo) => todo.id !== data.get("id"));

    context.cookies.set({
      name: "todos",
      value: btoa(JSON.stringify(todos)),
      httpOnly: true,
    });

    return new Response("", {
      headers: { "content-type": "text/html" },
    });
  }
};
