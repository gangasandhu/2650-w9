import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Note = ({ notes, updateNote }) => {
    const { id } = useParams();

    const note = notes.find(note => note.id == id);


    if (!note) {
        return <div>Note not found</div>;
    }

    const [editedText, setEditedText] = useState(note.text)

    const changeNote = async () => {
        const updatedNote = { ...note, text: editedText }
        await updateNote(updatedNote)
    }

    return (
        <div>
            <h1>Note ID: {id}</h1>
            <input
                onChange={(e) => setEditedText(e.target.value)}
                type='text'
                value={editedText}
            />
            <button onClick={changeNote}>Edit Note</button>
        </div>
    )
}

export default Note
