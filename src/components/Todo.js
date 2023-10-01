import { html } from "../utils.js";

export default function Todo({ todoId, title, done }) {
  return html`
    <article class="todo-item">
      <label>
        <input
          type="checkbox"
          name="done"
          id="done"
          hx-patch="/todos"
          hx-include="next [name=id]"
          hx-target="closest .todo-item"
          checked=${done === "on"}
        />
        <input type="hidden" name="id" value=${todoId} />
        ${done
          ? html` <p class="todo-title"><s>${title}</s></p> `
          : html` <p class="todo-title">${title}</p> `}
      </label>
      <button
        type="button"
        hx-delete="/todos"
        hx-target="closest .todo-item"
        hx-include="closest .todo-item"
      >
        x
      </button>
    </article>
  `;
}
