import { editing, cancelEditing } from "./state.js";

export async function saveIfEditing() {
  if (!editing) return true;
  
  const ok = window.confirm(
    "You have unsaved changes.\nClick OK to save, or Cancel to keep editing."
  );

  if (ok) {
    const btn =
      editing.querySelector(".save-btn") ||
      editing.querySelector(".create-btn");
    if (btn) btn.click();
    cancelEditing();
  }

  return false;
}
