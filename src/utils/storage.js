const KEY = "notes_data_v1";

export function saveNotes(notes) {
  localStorage.setItem(KEY, JSON.stringify(notes));
}

export function loadNotes() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}
