import { useEffect, useState } from "react";
import NoteForm from "./Components/NotesForm";
import NoteItem from "./Components/Notesitem";
import SearchBar from "./Components/Searchbar";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toLocaleString(),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);

    setTitle("");
    setContent("");
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const updateNote = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingId
          ? {
              ...note,
              title: title.trim(),
              content: content.trim(),
            }
          : note
      )
    );

    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const filteredNotes = notes.filter((note) => {
    const search = searchTerm.toLowerCase();

    return (
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search)
    );
  });

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>✎</span>
          <h1>Notes App</h1>
        </div>

        <button className="theme-button">
          ☾ <span>Dark Mode</span>
        </button>
      </header>

      <main className="container">
        <section className="hero">
          <h2>My Notes</h2>
          <p>Write, organize and keep your notes safe.</p>
        </section>

        <section className="workspace">
          <NoteForm
            title={title}
            content={content}
            editingId={editingId}
            setTitle={setTitle}
            setContent={setContent}
            addNote={addNote}
            updateNote={updateNote}
            clearForm={clearForm}
          />

          <aside className="sidebar">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <div className="tips">
              <h3>💡 Tips</h3>
              <p>Click on a note to edit it.</p>
              <p>Your notes are saved automatically.</p>
            </div>
          </aside>
        </section>

        <section className="notes">
          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              <h3>
                {searchTerm ? "No notes found" : "No notes yet"}
              </h3>

              <p>
                {searchTerm
                  ? "Try searching for something else."
                  : "Create your first note above."}
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                editNote={editNote}
                deleteNote={deleteNote}
              />
            ))
          )}
        </section>
      </main>

      <footer>Made with 💜 using React</footer>
    </div>
  );
}

export default App;