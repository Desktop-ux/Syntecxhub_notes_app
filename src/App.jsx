import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleInputRef = useRef(null);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");

    titleInputRef.current.focus();
  };

  return (
    <div className="app">
      <h1>Notes App</h1>

      <div className="note-form">
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={addNote}>Add Note</button>
      </div>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;