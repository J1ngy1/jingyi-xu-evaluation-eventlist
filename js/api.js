export const API_URL = "http://localhost:3000/events";

export async function fetchAllEvents() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function delEvent(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function addEvent(eventData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return await res.json();
}

export async function updateEvent(id, eventData) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
}
