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
      setLoading(false); // fix: don't stay stuck on "Loading notes..."
    }
  }, [user]);

  const addNoteHandler = async (note) => {
    try {
      const newNote = await createNote(note);
      setNotes((prev) => [newNote, ...prev]); // fix: functional updater to avoid stale closure
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

  if (!user) return <p>Loading...</p>;
  if (loading) return <p>Loading notes...</p>;

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{user.name}'s Notes</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <NoteForm addNote={addNoteHandler} />
      <NoteList notes={notes} deleteNote={deleteNoteHandler} />
    </div>
  );
}