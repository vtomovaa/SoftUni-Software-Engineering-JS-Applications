import { deleteById, getById, isUserGoing, getGoingCount, setGoing  } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (event, isOwner, goingCount, shouldSeeGoing, onGoing, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img
        id="details-img"
        src="${event.imageUrl}"
        alt="example1"
      />
      <p id="details-title">${event.name}</p>
      <p id="details-category">Category: <span id="categories">${event.category}</span></p>
      <p id="details-date">Date:<span id="date">${event.date}</span></p>
      <div id="info-wrapper">
        <div id="details-description">
          <span
            >${event.description}</span
          >
        </div>
      </div>

      <h3>Going: <span id="go">${goingCount}</span> times.</h3>

      ${isOwner ? html`<div id="action-buttons" >
      <a href="/edit/${event._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
  </div>` : nothing}
      ${shouldSeeGoing ? html`<div id="action-buttons" >
        <a @click=${onGoing} href="javascript:void(0)"  id="go-btn">Going</a>
      </div>` : nothing}
    </div>
  </section>
`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  let event = await getById(id);
  let isOwner = ctx.user && event._ownerId == ctx.user._id;

  let shouldSeeGoing = ctx.user && !isOwner && (await isUserGoing(id, ctx.user._id)) == 0;
  let goingCount = await getGoingCount(event._id)
  ctx.render(detailsTemplate(event, isOwner, goingCount, shouldSeeGoing, onGoing, onDelete));

  async function onGoing() {
    console.log("going")
    // const choice = confirm("Are you sure you want to delete this event?");

    // if (choice) {
      await setGoing({ eventId: id });
      ctx.page.redirect("/details/" + id);
    // }
  }
  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this event?");

    if (choice) {
      await deleteById(id);
      ctx.page.redirect("/");
    }
  }
}
