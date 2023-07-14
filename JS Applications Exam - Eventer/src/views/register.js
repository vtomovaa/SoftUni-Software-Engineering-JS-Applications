import { register } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (handler) => html` 
<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${handler} class="register-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="#">Login</a></p>
    </form>
  </div>
</section>`;

export async function showRegister(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)));

  async function onRegister(data) {
    if (!data.email || !data.password || !data["re-password"]) {
      return alert("All fields are required!");
    }

    if (data.password !== data["re-password"]) {
      return alert("Password don't match");
    }

    await register(data.email, data.password);
    ctx.updateNav();
    ctx.page.redirect("/");
  }
}
