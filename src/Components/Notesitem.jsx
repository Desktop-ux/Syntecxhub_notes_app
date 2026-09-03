function NoteItem({ note, editNote, deleteNote }) {
  return (
    <article className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <small>{note.createdAt}</small>

      <div className="note-actions">
        <button onClick={() => editNote(note)}>
          ✏️ Edit
        </button>

        <button onClick={() => deleteNote(note.id)}>
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}

export default NoteItem;