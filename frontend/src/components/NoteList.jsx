import Note from "./Note";

function NoteList({ notes, deleteNote }) {
  if (notes.length === 0) return <p>No notes yet!</p>;

  return (
    <div>
      {notes.map((note) => (
        <Note key={note._id} note={note} deleteNote={deleteNote} />
      ))}
    </div>
  );
}

export default NoteList;