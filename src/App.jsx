import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";
import { loadNotes, saveNotes } from "./utils/storage";
import { loadTags, saveTags } from "./utils/tagStorage";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [tags, setTags] = useState(["umum"]);


  // toast
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  }

  // filter tag
  const [tagFilter, setTagFilter] = useState("all");

  useEffect(() => {
  setNotes(loadNotes());

  const loadedTags = loadTags();
  if (!loadedTags.includes("umum")) {
    loadedTags.unshift("umum");
  }
  setTags(loadedTags);
}, []);


  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    saveTags(tags);
  }, [tags]);

  function addNote(data) {
    const newNote = {
      id: Date.now(),
      title: data.title,
      content: data.content || "",
      mode: data.mode || "note",
      todos: data.todos || [],
      tag: data.tag || "umum",
      pinned: false,
      date: new Date().toLocaleString(),
    };

    setNotes((prev) => [newNote, ...prev]);
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingNote && editingNote.id === id) setEditingNote(null);
    showToast("🗑️ Catatan dihapus!");
  }

  function togglePin(id) {
    setNotes((prev) => {
    const updated = prev.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    );

    updated.sort((a, b) => {
      if (a.pinned === b.pinned) return b.id - a.id;
      return b.pinned - a.pinned;
    });

    return updated;
  });

  showToast("📌 Pin diperbarui!");
}

  function startEdit(note) {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateNote(id, data) {
    setNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                title: data.title,
                content: data.content || "",
                mode: data.mode || "note",
                todos: data.todos || [],
                tag: data.tag || "umum",
                date: new Date().toLocaleString(),
              }
            : n
        )
      );

      setEditingNote(null);
    }

  function toggleTodo(noteId, todoId) {
    const updated = notes.map((n) => {
      if (n.id !== noteId) return n;

      return {
        ...n,
        todos: (n.todos || []).map((t) =>
          t.id === todoId ? { ...t, done: !t.done } : t
        ),
      };
    });

    setNotes(updated);
  }

  function addTag(newTag) {
    const clean = newTag.trim().toLowerCase();
    if (!clean) return;

    if (clean === "all") {
      showToast("❌ Tag 'all' tidak boleh dipakai.");
      return;
    }

    setTags((prev) => {
      if (prev.includes(clean)) return prev;
      return [clean, ...prev];
    });
    }

    function deleteTag(tagName) {
      if (tagName === "umum") {
        showToast("❌ Tag 'umum' tidak bisa dihapus!");
        return;
      }

      setTags((prev) => prev.filter((t) => t !== tagName));
      setNotes((prev) =>
        prev.map((n) => (n.tag === tagName ? { ...n, tag: "umum" } : n))
      );

      setTagFilter((prev) => (prev === tagName ? "all" : prev));
      showToast(`🗑️ Tag '${tagName}' dihapus (catatan pindah ke umum)`);
    }

  const filteredNotes = notes.filter((n) => {
    const matchSearch = (n.title + n.content)
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchTag = tagFilter === "all" ? true : n.tag === tagFilter;

    return matchSearch && matchTag;
  });

  return (
    <div className={darkMode ? "min-h-screen bg-zinc-900" : "min-h-screen bg-gray-100"}>
      <Navbar
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-zinc-900 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-4 mt-4">
        {/* Filter Tag */}
        {/* Manage Tags */}
        <div
          className={`p-3 rounded-xl shadow-md flex flex-col gap-2 ${
            darkMode ? "bg-zinc-800 text-white" : "bg-white"
          }`}
        >
          <h3 className="font-semibold">Kelola Tag</h3>

          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <div
                key={t}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  darkMode ? "bg-zinc-900/60" : "bg-gray-200"
                }`}
              >
                <span>#{t}</span>

                {t !== "umum" && (
                  <button
                    onClick={() => deleteTag(t)}
                    className="text-red-500 hover:underline"
                    title="Hapus tag"
                  >
                    x
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <span className={darkMode ? "text-white font-semibold" : "font-semibold"}>
            Filter Tag:
          </span>

          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className={`border p-2 rounded-md outline-none ${
              darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white"
            }`}
          >
            <option value="all">Semua</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <NoteForm
            addNote={addNote}
            editingNote={editingNote}
            updateNote={updateNote}
            darkMode={darkMode}
            showToast={showToast}
            tags={tags}
            addTag={addTag}
          />

          <div className="flex flex-col gap-3">
            <h2 className={`font-semibold text-lg ${darkMode ? "text-white" : ""}`}>
              Catatan ({filteredNotes.length})
            </h2>

            {filteredNotes.length === 0 ? (
              <p className={darkMode ? "text-zinc-400" : "text-gray-500"}>
                Belum ada catatan...
              </p>
            ) : (
              filteredNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  deleteNote={deleteNote}
                  togglePin={togglePin}
                  startEdit={startEdit}
                  toggleTodo={toggleTodo}
                  darkMode={darkMode}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
