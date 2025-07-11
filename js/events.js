import { addEvent } from "./api.js";
import { initRowHandlers } from "./ui.js";
// import { editing, setEditing, cancelEditing } from "./state.js";
// import { saveIfEditing } from "./utils.js";
export function initAddButton() {
  document.getElementById("add-btn").onclick = () => {
    // if (editing) {
    //   const ok = await saveIfEditing();
    //   if (!ok) return;
    // }

    const table = document.getElementById("event-table");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" placeholder="Event name"></td>
      <td><input type="date"></td>
      <td><input type="date"></td>
      <td>
        <button  type="button" class="create-btn"><i class="fas fa-plus"></i></button>
        <button  type="button" class="cancel-btn"><i class="fas fa-times"></i></button>
      </td>`;

    table.appendChild(row);
    // setEditing(row);

    row.querySelector(".cancel-btn").onclick = () => {
      row.remove();
      // cancelEditing();
    };

    row.querySelector(".create-btn").onclick = async (e) => {
      e.preventDefault();
      const name = row.children[0].querySelector("input").value.trim();
      const start = row.children[1].querySelector("input").value;
      const end = row.children[2].querySelector("input").value;
      if (!name || !start || !end) {
        alert("Fill all fields");
        return;
      }

      const saved = await addEvent({
        eventName: name,
        startDate: start,
        endDate: end,
      });

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${saved.eventName}</td>
        <td>${saved.startDate}</td>
        <td>${saved.endDate}</td>
        <td>
          <button  type="button" class="edit-btn"><i class="fas fa-pen"></i></button>
          <button   type="button" class="save-btn" style="display:none"><i class="fas fa-check"></i></button>
          <button   type="button" class="del-btn"><i class="fas fa-trash"></i></button>
        </td>
      `;
      row.replaceWith(newRow);
      initRowHandlers(newRow, saved);
      // cancelEditing();
    };
  };
}
