import { editEvent, getById } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (event, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value=${event.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value=${event.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value=${event.category}
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${event.description}</textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value=${event.date}
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>  
`;

  export async function showEdit(ctx) {
    const id = ctx.params.id;
    const event = await getById(id);
    ctx.render(editTemplate(event, createSubmitHandler(onEdit)));

    async function onEdit({
      name,
      imageUrl, 
      category, 
      description, 
      date}, 
      form) 
      {
        if(name == '' || imageUrl == '' || category == '' || description == '' || date == '') {
            return alert('All fields are required!');
        }

        await editEvent(id, {
          name,
          imageUrl, 
          category, 
          description, 
          date        
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}