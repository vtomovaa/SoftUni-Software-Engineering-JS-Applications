import { html, nothing } from "../lib.js";
import { getAllEvents } from "../api/data.js";

const cardTemplate = (event, hasUser) => html`
  <div class="event">
    <img src=${event.imageUrl} alt="example1" />
    <p class="title">${event.name}</p>
    <p class="date">${event.date}</p>
    <a class="details-btn" href="/details/${event._id}">Details</a>
  </div>
`;

const catalogTemplate = (events, hasUser) => html`
  <section id="dashboard">
  ${events.length > 0
    ? events.map((event) => cardTemplate(event, hasUser))
    : html`<h4>No Events yet.</h4>`};
  </section>
`;

export async function showCatalog(ctx) {
  const allEvents = await getAllEvents();
  ctx.render(catalogTemplate(allEvents, !!ctx.user));
}
