let _notes = [
    { id: "2", text: "CPSC 2650" },
    { id: "1", text: "An awesome web dev Note" },
  ];
  
  // TODO: implement addNote and removeNote
  const addNote = (note) => {
    _notes.push(note)
  }

  const removeNote = (noteId) => {
    _notes = _notes.filter(note => note.id != noteId)
  }

  const editNote = (noteId, noteText) => {
    _notes = _notes.map(note => (note.id == noteId) ? {...note, text: noteText} : note)
  }
  // For fun: why do we export a function instead of notes directly?
  const notes = () => _notes;
  
  export { notes, addNote, removeNote, editNote };