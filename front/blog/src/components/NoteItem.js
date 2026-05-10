function NoteItem({ note, startEdit, deleteNote }) {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="note-card">

      <h3>{note.title}</h3>

      <div
        dangerouslySetInnerHTML={{
          __html: note.content,
        }}
      />

      <p>
        {formatDate(note.created_at)}
      </p>

  

      <div className="actions">

        <button onClick={() => startEdit(note)}>
          Modifier
        </button>

        <button onClick={() => deleteNote(note.id)}>
          Supprimer
        </button>

      </div>
    <span className={`priority ${note.priority}`}>
  {note.priority}
</span>

    </div>
  );
}

export default NoteItem;