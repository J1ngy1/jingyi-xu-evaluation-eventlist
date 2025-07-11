import { fetchAllEvents } from "./api.js";
import { renderEvents } from "./ui.js";
import { initAddButton } from "./events.js";

window.addEventListener("DOMContentLoaded", async () => {
  renderEvents(await fetchAllEvents());
  initAddButton();
});
