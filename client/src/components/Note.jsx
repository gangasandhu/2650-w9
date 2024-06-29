import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Note = ({ notes, updateNote }) => {
    const { id } = useParams();

    const note = notes.find(note => note.id == id);


    
    const [editedText, setEditedText] = useState(note ? note.text: '');
    const [imageUrl, setImageUrl] = useState(note ? note.imageUrl : '');
    const [imageAuthorName, setImageAuthorName] = useState(note ? note.imageAuthorName : '');
    const [imageAuthorLink, setImageAuthorLink] = useState(note ? note.imageAuthorLink : '');

    const changeNote = async () => {
        const updatedNote = { ...note, text: editedText }
        await updateNote(updatedNote)
    }

    const handleGenerateImage = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: editedText })
            });
            const data = await response.json();
            setImageUrl(data.imageUrl);
            setImageAuthorName(data.imageAuthorName);
            setImageAuthorLink(data.imageAuthorLink);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    if (!note) {
        return <div>Note not found</div>;
    }

    return (
        <>
        <div>
            <h1>Note ID: {id}</h1>
            <input
                onChange={(e) => setEditedText(e.target.value)}
                type='text'
                value={editedText}
            />
            <button onClick={changeNote}>Edit Note</button>
        </div>
        <button onClick={handleGenerateImage}>Generate Image</button>
        {imageUrl && (
                <div>
                    <img src={imageUrl} alt={editedText} />
                    <p>
                        Photo by <a href={imageAuthorLink} target="_blank" rel="noopener noreferrer">{imageAuthorName}</a>
                    </p>
                </div>
            )}

        </>
    )
}

export default Note
