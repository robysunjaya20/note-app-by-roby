export default function Navbar({ search, setSearch, darkMode, setDarkMode }) {
  return (
    <div className="w-full bg-zinc-900 text-white p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <img
          src="./logo.png"
          alt="Logo Note-app"
          className="w-8 h-8 object-contain"
        />
        <h1 className="text-xl font-bold">Note-app by Roby</h1>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Cari catatan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md text-black w-full md:w-80 outline-none"
        />

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white text-zinc-900 px-4 rounded-md font-semibold hover:bg-zinc-200"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}
