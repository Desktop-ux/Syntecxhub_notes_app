import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
          <div className="editor">
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="editor-actions">
              <button className="add-button" onClick={addNote}>
                ＋ Add Note
              </button>

              <button
                className="clear-button"
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
              >
                🗑 Clear
              </button>
            </div>
          </div>

          <aside className="sidebar">
            <input type="text" placeholder="⌕  Search notes..." />

            <div className="tips">
              <h3>💡 Tips</h3>
              <p>Click on a note to edit it.</p>
              <p>Your notes are saved automatically.</p>
            </div>
          </aside>
        </section>

        <section className="notes">
          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>Create your first note above.</p>
            </div>
          ) : (
            notes.map((note) => (
              <article className="note-card" key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <small>{note.createdAt}</small>
              </article>
            ))
          )}
        </section>
      </main>

      <footer>Made with 💜 using React</footer>
    </div>
  );
}

export default App;