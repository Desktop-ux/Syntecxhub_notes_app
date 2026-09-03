function NoteForm({
  title,
  content,
  editingId,
  setTitle,
  setContent,
  addNote,
  updateNote,
  clearForm,
}) {
  return (
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
        <button
          className="add-button"
          onClick={editingId ? updateNote : addNote}
        >
          {editingId ? "✓ Update Note" : "＋ Add Note"}
        </button>

        <button className="clear-button" onClick={clearForm}>
          🗑 Clear
        </button>
      </div>
    </div>
  );
}

export default NoteForm;