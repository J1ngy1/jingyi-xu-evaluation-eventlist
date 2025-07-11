export let editing = null;
export function setEditing(row) {
  editing = row;
}
export function cancelEditing() {
  editing = null;
}
