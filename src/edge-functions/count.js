import { html } from "../utils.js";

export default (req, context) => {
  if (req.method === "POST") {
    const count = context.cookies.get("count") || 0;
    const newCount = Number(count) + 1;
    context.cookies.set({
      name: "count",
      value: newCount,
    });

    const body = html`<span id="count">Click: ${newCount}</span>`;

    return new Response(body, {
      headers: { "content-type": "text/html" },
    });
  }
  return Response.redirect("/");
};
