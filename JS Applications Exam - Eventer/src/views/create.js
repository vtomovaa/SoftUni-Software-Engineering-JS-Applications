import { createEvent } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (handler) => html`
  <section id="create">
    <div class="form">
      <h2>Add Event</h2>
      <form @submit=${handler} class="create-form">
        <input type="text" name="name" id="name" placeholder="Event" />
        <input
          type="text"
          name="imageUrl"
          id="event-image"
          placeholder="Event Image URL"
        />
        <input
          type="text"
          name="category"
          id="event-category"
          placeholder="Category"
        />

        <textarea
          id="event-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>

        <input type="text" name="date" id="date" placeholder="When?" />

        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

export async function showCreate(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data) {
    const { 
        name,
        imageUrl, 
        category, 
        description, 
        date
       } =
      data;
    if (
      !name ||
      !imageUrl ||
      !category ||
      !date ||
      !description
    ) {
      return alert("All fields are required!");
    }

    await createEvent(data);
    ctx.page.redirect("/catalog");
  }
}
