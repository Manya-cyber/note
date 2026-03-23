import { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) return;
    addNote({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        className="note-form__input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="note-form__textarea"
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <button className="note-form__submit" type="submit">
        <span>Add Note</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </form>
  );
}

export default NoteForm;