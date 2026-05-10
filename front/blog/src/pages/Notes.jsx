import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

function Notes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("moyenne");

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [error, setError] = useState(""); 


  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      setError("");
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Erreur chargement des notes");
      }
    }
  };

  const addNote = async () => {
    if (!title.trim()) {
      setError("Le titre est obligatoire");
      return;
    }

    try {
      await api.post("/notes", {
        title,
        content,
        priority,
      });

      setError("");
      resetForm();
      fetchNotes();
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        setError("Non autorisé");
      } else if (status === 422) {
        setError("Titre obligatoire ou données invalides");
      } else {
        setError("Erreur serveur");
      }
    }
  };


  const deleteNote = async (id) => {
    if (!window.confirm("Supprimer cette note ?")) return;

    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      setError("Erreur suppression");
    }
  };


  const startEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setPriority(note.priority);
  };

  const updateNote = async () => {
    try {
      await api.put(`/notes/${editId}`, {
        title,
        content,
        priority,
      });

      setError("");
      resetForm();
      fetchNotes();
    } catch (err) {
      setError("Erreur modification");
    }
  };


  const resetForm = () => {
    setTitle("");
    setContent("");
    setPriority("moyenne");
    setEditId(null);
    setError("");
  };


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 
  useEffect(() => {
    fetchNotes();
   
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-page">

      <div className="top-bar">
        <h1>Gestion des Notes</h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      {/* 🔥 ERROR DISPLAY */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Rechercher une note..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes-container">

        <NoteForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          priority={priority}
          setPriority={setPriority}
          editId={editId}
          addNote={addNote}
          updateNote={updateNote}
          resetForm={resetForm}
        />

        <NoteList
          notes={filteredNotes}
          startEdit={startEdit}
          deleteNote={deleteNote}
        />

      </div>

    </div>
  );
}

export default Notes;