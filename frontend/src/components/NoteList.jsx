import Note from "./Note";

function NoteList({ notes, deleteNote }) {
  if (notes.length === 0)
    return (
      <div className="empty-state">
        <div className="empty-state__icon">✦</div>
        <p className="empty-state__text">No notes yet. Start writing.</p>
      </div>
    );

  return (
    <div className="note-grid">
      {notes.map((note, i) => (
        <div key={note._id} style={{ animationDelay: `${i * 60}ms` }} className="note-grid__item">
          <Note note={note} deleteNote={deleteNote} />
        </div>
      ))}
    </div>
  );
}

export default NoteList;