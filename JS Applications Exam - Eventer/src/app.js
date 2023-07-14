//import views
// ensure the path ends with .js
import { page, render } from "./lib.js";
import { updateNav } from "./views/nav.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCreate } from "./views/create.js";
import { showCatalog } from "./views/catalog.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";

//get main element for renderer
const main = document.getElementById("main-content");

//attached middle ware
page(decorateContext);
// landing page
page("/", showHome);
// landing page
page("/home", showHome);
// show all items / similar to dashboard
page("/catalog", showCatalog);
// // show details of a single item
page("/details/:id", showDetails);
// // edit a single item to update some info, similar appearance to details
page("/edit/:id", showEdit);
// // create a new item
page("/create", showCreate);
page("/login", showLogin);
page("/register", showRegister);
//page("/search", () => console.log("searchView"));

//create page routing

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;

  const user = getUserData();

  if (user) {
    ctx.user = user;
  }

  next();
}

function renderMain(content) {
  render(content, main);
}
