import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  priority,
  setPriority,
  editId,
  addNote,
  updateNote,
  resetForm,
}) {
  return (
    <div className="form-box">

      <h2>
        {editId ? "Modifier la note" : "Ajouter une note"}
      </h2>

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ReactQuill
        value={content}
        onChange={setContent}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
      </select>

      {editId ? (
        <>
          <button onClick={updateNote}>
            Modifier
          </button>

          <button onClick={resetForm}>
            Annuler
          </button>
        </>
      ) : (
        <button onClick={addNote}>
          Ajouter
        </button>
      )}

    </div>
  );
}

export default NoteForm;