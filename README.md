# 📝 Note-app by Roby

A modern web-based note application built using **React + Vite + TailwindCSS**.  
This app supports **custom tags**, **checklist/todo mode**, **pin notes**, **dark mode**, and stores all data using **LocalStorage** (no backend required).

---

## 🚀 Live Demo
GitHub Pages:
- [https://USERNAME.github.io/note-app-by-roby/](https://robysunjaya20.github.io/note-app-by-roby/)

---

## ✨ Features
✅ Create new note  
✅ Edit note  
✅ Delete note  
✅ Search notes  
✅ Pin / Unpin notes 📌  
✅ Dark mode 🌙  
✅ Notes saved automatically using LocalStorage  
✅ Tags / Categories (custom tags supported) 🏷️  
✅ Tag management (delete tag & auto move notes to "umum")  
✅ Checklist / To-do Mode ✅  
✅ Toast notification after actions (saved, updated, deleted)

---

## 🛠️ Tech Stack
- **React** (UI Library)
- **Vite** (Fast build tool)
- **TailwindCSS** (Modern styling)
- **LocalStorage** (Data persistence)
- **GitHub Pages** (Free hosting)

---

## 📂 Project Structure
```txt
src/
├── components/
│   ├── Navbar.jsx
│   ├── NoteForm.jsx
│   └── NoteItem.jsx
├── utils/
│   ├── storage.js
│   └── tagStorage.js
├── App.jsx
└── main.jsx
public/
└── logo-note.png
