import { useEffect, useState } from "react";

export default function NoteForm({
  addNote,
  editingNote,
  updateNote,
  darkMode,
  showToast,
  tags,
  addTag,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("umum");
  const [mode, setMode] = useState("note"); // "note" atau "todo"
  const [todosText, setTodosText] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setTag(editingNote.tag || "umum");
      setMode(editingNote.mode || "note");

      if (editingNote.mode === "todo") {
        // tampilkan todo ke textarea (satu baris satu item)
        const txt = (editingNote.todos || [])
          .map((t) => (t.done ? `[x] ${t.text}` : `[ ] ${t.text}`))
          .join("\n");
        setTodosText(txt);
        setContent("");
      } else {
        setContent(editingNote.content);
        setTodosText("");
      }
    }
  }, [editingNote]);

  function parseTodos(text) {
    // Format input:
    // [ ] beli makan
    // [x] tugas selesai
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    return lines.map((line) => {
      const lower = line.toLowerCase();
      const done =
        lower.startsWith("[x]") ||
        lower.startsWith("[✔]") ||
        lower.startsWith("[v]");
      const cleaned = line.replace(/^\[( |x|✔|v)\]\s*/i, "");
      return {
        id: Date.now() + Math.random(),
        text: cleaned,
        done: done,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    if (mode === "note") {
      if (!content.trim()) return;

      if (editingNote) {
        updateNote(editingNote.id, {
          title,
          tag,
          mode,
          content,
          todos: [],
        });
        showToast("✅ Catatan berhasil diupdate!");
      } else {
        addNote({
          title,
          tag,
          mode,
          content,
          todos: [],
        });
        showToast("✅ Catatan tersimpan!");
      }
    }

    if (mode === "todo") {
      if (!todosText.trim()) return;

      const todos = parseTodos(todosText);

      if (editingNote) {
        updateNote(editingNote.id, {
          title,
          tag,
          mode,
          content: "",
          todos,
        });
        showToast("✅ Checklist berhasil diupdate!");
      } else {
        addNote({
          title,
          tag,
          mode,
          content: "",
          todos,
        });
        showToast("✅ Checklist tersimpan!");
      }
    }

    setTitle("");
    setContent("");
    setTodosText("");
    setTag("umum");
    setMode("note");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded-xl shadow-md flex flex-col gap-3 ${
        darkMode ? "bg-zinc-800 text-white" : "bg-white"
      }`}
    >
      <h2 className="font-semibold text-lg">
        {editingNote ? "Edit Catatan ✏️" : "Tambah Catatan"}
      </h2>

      {/* Mode */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("note")}
          className={`px-3 py-2 rounded-md text-sm font-semibold ${
            mode === "note"
              ? "bg-zinc-900 text-white"
              : darkMode
              ? "bg-zinc-900/40 text-white"
              : "bg-gray-200"
          }`}
        >
          📝 Note
        </button>

        <button
          type="button"
          onClick={() => setMode("todo")}
          className={`px-3 py-2 rounded-md text-sm font-semibold ${
            mode === "todo"
              ? "bg-zinc-900 text-white"
              : darkMode
              ? "bg-zinc-900/40 text-white"
              : "bg-gray-200"
          }`}
        >
          ✅ Checklist
        </button>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Judul..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`border p-2 rounded-md outline-none ${
          darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white"
        }`}
      />

      {/* Tag */}
      <div className="flex gap-2">
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className={`border p-2 rounded-md outline-none w-full ${
            darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white"
          }`}
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tag baru..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className={`border p-2 rounded-md outline-none w-full ${
            darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white"
          }`}
        />

        <button
          type="button"
          onClick={() => {
            const clean = newTag.trim().toLowerCase();
            if (!clean) return;

            addTag(clean);
            setTag(clean);
            setNewTag("");
            showToast("🏷️ Tag baru ditambahkan!");
          }}
          className="bg-zinc-900 text-white px-4 rounded-md font-semibold hover:bg-zinc-700"
        >
          +
        </button>
      </div>

      {/* Content / Todo */}
      {mode === "note" ? (
        <textarea
          placeholder="Isi catatan..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`border p-2 rounded-md h-28 resize-none outline-none ${
            darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white"
          }`}
        ></textarea>
      ) : (
        <textarea
          placeholder={`Checklist (1 baris 1 item)\nContoh:\n[ ] beli makan\n[x] tugas selesai`}
          value={todosText}
          onChange={(e) => setTodosText(e.target.value)}
          className={`border p-2 rounded-md h-28 resize-none outline-none ${
            darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white"
          }`}
        ></textarea>
      )}

      <button className="bg-zinc-900 text-white p-2 rounded-md hover:bg-zinc-700">
        {editingNote ? "Update" : "Simpan"}
      </button>
    </form>
  );
}
