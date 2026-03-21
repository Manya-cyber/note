import axios from "axios";

const API_URL = "http://localhost:5000/api/notes"; // change if needed

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Fetch all notes for logged-in user
export const fetchNotes = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

// Create a new note
export const createNote = async (note) => {
  const response = await axios.post(API_URL, note, { headers: getAuthHeaders() });
  return response.data;
};

// Delete a note by id
export const deleteNoteById = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  return response.data;
};