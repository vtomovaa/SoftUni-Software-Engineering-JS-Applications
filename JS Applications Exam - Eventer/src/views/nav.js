import { html, render, page } from "../lib.js";
import { logout } from "../api/user.js";
import { getUserData } from "../util.js";

const nav = document.querySelector("header");

const navTemplate = (hasUser) => html`
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="/catalog">Events</a>
    </div>
<div>
    ${hasUser ?
        html`
            <a href="/create">Add Event</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        ` : html`
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        `}
    </div>
  </nav>
`;

export function updateNav() {
  const user = getUserData();

  render(navTemplate(user), nav);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
