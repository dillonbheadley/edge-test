import { html } from "../utils.js";

export default function Todo({ todo: { id, title, done } }) {
  return html`
    <article class="todo-item">
      <label>
        <input
          id="${id}-input"
          type="checkbox"
          name="done"
          hx-patch="/todos"
          hx-include="closest .todo-item"
          hx-target="closest .todo-item"
          hx-swap="outerHTML"
          checked=${done === "on"}
        />
        <input type="hidden" name="id" value=${id} />
        ${done
          ? html`<p class="todo-title"><s>${title}</s></p>`
          : html`<p class="todo-title">${title}</p>`}
      </label>
      <button
        id="${id}-button"
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
