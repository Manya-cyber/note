import { useState } from "react";

function Note({ note, deleteNote }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    setTimeout(() => deleteNote(note._id), 300);
  };

  // Generate a consistent accent per note based on _id
  const accents = ["#a855f7", "#c084fc", "#7c3aed", "#9333ea", "#d946ef"];
  const accent = accents[(note._id?.charCodeAt(0) || 0) % accents.length];

  return (
    <div className={`note-card ${deleting ? "note-card--deleting" : ""}`}
         style={{ "--note-accent": accent }}>
      <div className="note-card__accent-bar" />
      <div className="note-card__body">
        <h3 className="note-card__title">{note.title || "Untitled"}</h3>
        <p className="note-card__content">{note.content}</p>
      </div>
      <button className="note-card__delete" onClick={handleDelete} title="Delete note">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default Note;