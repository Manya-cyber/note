import { useState, useEffect, useContext } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchNotes, createNote, deleteNoteById } from "../api/notes";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      loadNotes();
    } else {
      setLoading(false);
    }
  }, [user]);

  const addNoteHandler = async (note) => {
    try {
      const newNote = await createNote(note);
      setNotes((prev) => [newNote, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to add note");
    }
  };

  const deleteNoteHandler = async (id) => {
    try {
      await deleteNoteById(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user)
    return (
      <div className="splash-screen">
        <div className="splash-orb" />
        <p className="splash-text">Loading...</p>
      </div>
    );

  if (loading)
    return (
      <div className="splash-screen">
        <div className="splash-orb" />
        <p className="splash-text">Fetching your notes...</p>
      </div>
    );

  return (
    <div className="home-wrapper">
      {/* Background mesh */}
      <div className="bg-mesh" />
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />

      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__logo">✦</span>
          <span className="topbar__title">Inkwell</span>
        </div>
        <div className="topbar__right">
          <span className="topbar__username">{user.name}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <h1 className="hero-heading">
            Your <em>thoughts</em>,<br /> crystallized.
          </h1>
          <p className="hero-sub">
            {notes.length} {notes.length === 1 ? "note" : "notes"} stored
          </p>
        </section>

        <div className="content-grid">
          <aside className="sidebar">
            <div className="sidebar__card">
              <p className="sidebar__label">New Note</p>
              <NoteForm addNote={addNoteHandler} />
            </div>
          </aside>

          <section className="notes-section">
            <NoteList notes={notes} deleteNote={deleteNoteHandler} />
          </section>
        </div>
      </main>
    </div>
  );
}