import NoteItem from "./NoteItem";

function NoteList({ notes, startEdit, deleteNote }) {

  if (notes.length === 0) {
    return <p>Aucune note</p>;
  }

  return (
    <div className="list-box">

      <h2>Mes notes</h2>

      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          startEdit={startEdit}
          deleteNote={deleteNote}
        />
      ))}

    </div>
  );
}

export default NoteList;