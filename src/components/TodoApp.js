import { makeTodo } from "../edge-functions/todos.js";
import { html } from "../utils.js";

export default function TodoApp({ todos = [] }) {
  return html`
    <div id="todo_app">
      <h2>Todos</h2>
      <form
        hx-post="/todos"
        hx-target="#todos-list"
        hx-swap="beforeend"
        hx-on:submit="this['new-todo'].value = ''"
      >
        <p id="todo-message"></p>
        <input type="text" name="new-todo" id="new-todo" required />
        <button>add</button>
      </form>
      <div id="todos-list">${todos.map(makeTodo)}</div>
    </div>
  `;
}
