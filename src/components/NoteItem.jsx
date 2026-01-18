export default function NoteItem({
  note,
  deleteNote,
  togglePin,
  startEdit,
  toggleTodo,
  darkMode,
}) {
  return (
    <div
      className={`p-4 rounded-xl shadow-md flex flex-col gap-2 ${
        darkMode ? "bg-zinc-800 text-white" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-bold text-lg">
            {note.pinned ? "📌 " : ""}
            {note.title}
          </h3>

          <div className="flex gap-2 mt-1">
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold ${
                darkMode ? "bg-zinc-900/60 text-zinc-200" : "bg-gray-200"
              }`}
            >
              #{note.tag || "umum"}
            </span>

            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold ${
                darkMode ? "bg-zinc-900/60 text-zinc-200" : "bg-gray-200"
              }`}
            >
              {note.mode === "todo" ? "✅ Checklist" : "📝 Note"}
            </span>
          </div>
        </div>

        <button
          onClick={() => togglePin(note.id)}
          className="text-sm font-semibold hover:underline"
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>
      </div>

      {/* Body */}
      {note.mode === "note" ? (
        <p
          className={`whitespace-pre-line ${
            darkMode ? "text-zinc-200" : "text-gray-700"
          }`}
        >
          {note.content}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {(note.todos || []).map((t) => (
            <label
              key={t.id}
              className={`flex items-center gap-2 text-sm ${
                darkMode ? "text-zinc-200" : "text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(note.id, t.id)}
              />
              <span className={t.done ? "line-through opacity-70" : ""}>
                {t.text}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-2">
        <small className={darkMode ? "text-zinc-400" : "text-gray-400"}>
          {note.date}
        </small>

        <div className="flex gap-3">
          <button
            onClick={() => startEdit(note)}
            className="text-blue-500 font-semibold hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => deleteNote(note.id)}
            className="text-red-500 font-semibold hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
