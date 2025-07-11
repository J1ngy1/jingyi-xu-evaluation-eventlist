import { delEvent, updateEvent } from "./api.js";
import { editing, setEditing, cancelEditing } from "./state.js";
import { saveIfEditing } from "./utils.js";

export function renderEvents(events) {
  const table = document.getElementById("event-table");
  table.innerHTML = `
    <tr><th>Name</th><th>Start</th><th>End</th><th>Actions</th></tr>`;
  events.forEach((ev) => {
    const row = document.createElement("tr");
    row.innerHTML = getRow(ev);
    table.appendChild(row);
    initRowHandlers(row, ev);
  });
}

function getRow(ev) {
  return `
  <td>${ev.eventName}</td><td>${ev.startDate}</td><td>${ev.endDate}</td>
  <td>
    <button class="edit-btn"><i class="fas fa-pen"></i></button>
    <button class="save-btn" style="display:none"><i class="fas fa-check"></i></button>
    <button class="del-btn"><i class="fas fa-trash"></i></button>
  </td>`;
}

export function initRowHandlers(row, ev) {
  const edit = row.querySelector(".edit-btn");
  const save = row.querySelector(".save-btn");
  const del = row.querySelector(".del-btn");

  del.onclick = async () => {
    await delEvent(ev.id);
    row.remove();
  };

  edit.onclick = async () => {
    if (editing && editing !== row) {
      const ok = await saveIfEditing();
      if (!ok) return;
    }
    setEditing(row);
    row.children[0].innerHTML = `<input type="text" value="${ev.eventName}">`;
    row.children[1].innerHTML = `<input type="date" value="${ev.startDate}">`;
    row.children[2].innerHTML = `<input type="date" value="${ev.endDate}">`;
    edit.style.display = "none";
    save.style.display = "inline-block";
  };

  save.onclick = async () => {
    const name = row.children[0].querySelector("input").value.trim();
    const start = row.children[1].querySelector("input").value;
    const end = row.children[2].querySelector("input").value;

    if (!name || !start || !end) {
      alert("All fields are required.");
      return;
    }

    const updated = {
      eventName: name,
      startDate: start,
      endDate: end,
    };

    await updateEvent(ev.id, updated);
    row.innerHTML = getRow({ ...ev, ...updated });
    initRowHandlers(row, { ...ev, ...updated });
    cancelEditing();
  };
}
