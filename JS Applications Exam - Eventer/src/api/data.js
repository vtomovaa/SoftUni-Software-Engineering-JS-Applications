import { del, get, post, put } from './api.js';

const endpoints = {
    'events' : "/data/events",
    'going' : "/data/going",
    'getAllEvents' : "/data/events?sortBy=_createdOn%20desc"
}

export async function createEvent(data) {
    return post(endpoints.events, data);
}

export async function setGoing(data) {
    return post(endpoints.going, data);
}
export async function getAllEvents() {
    return get(endpoints.getAllEvents);
}


export async function getById(id) {
    return get('/data/events/' + id);
}

export async function getGoingCount(id) {
    return get(`/data/going?where=eventId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function isUserGoing(id, userId) {
    return get(`/data/going?where=eventId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function deleteById(id) {
    return del('/data/events/' + id);
}


export async function editEvent(id, editEvent) {
    return put('/data/events/' + id, editEvent);
}