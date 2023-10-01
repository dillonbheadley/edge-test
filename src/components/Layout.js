import { html } from "../utils.js";

export default function Layout({ title, description, children }) {
  return (
    "<!DOCTYPE html>" +
    html`
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>${title}</title>
          <meta name="description" content="${description}" />
          <link rel="stylesheet" href="style.css" />
          <script
            src="https://unpkg.com/htmx.org@1.9.6"
            integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
            crossorigin="anonymous"
            defer
          ></script>
        </head>
        <body>
          ${children}
        </body>
      </html>
    `
  );
}
