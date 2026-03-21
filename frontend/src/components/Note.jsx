function Note({ note, deleteNote }) {
  return (
    <div className="note" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => deleteNote(note._id)}>Delete</button>
    </div>
  );
}

export default Note;