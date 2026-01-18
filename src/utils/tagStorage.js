const TAG_KEY = "note_tags_v1";

export function saveTags(tags) {
  localStorage.setItem(TAG_KEY, JSON.stringify(tags));
}

export function loadTags() {
  try {
    const data = localStorage.getItem(TAG_KEY);
    const tags = data
      ? JSON.parse(data)
      : ["umum", "kuliah", "kerja", "penting", "ide"];

    if (!tags.includes("umum")) tags.unshift("umum");
    return tags;
  } catch {
    return ["umum", "kuliah", "kerja", "penting", "ide"];
  }
}
