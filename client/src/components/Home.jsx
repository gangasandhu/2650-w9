import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = ({notes, deleteNote, addNote}) => {

  const [text, setText] = useState("")

  return (
    <div id='home'>

      <h1>YANT</h1>

      <div id='notes'>
        {notes.map(note => {
          return (
            <div key={note.id}>
              <div id='note'>
                <Link to={`/note/${note.id}`}>{note.text}</Link>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <input
                onChange={(e) => setText(e.target.value)}
                type='text'
                value={text}
            />
      <button onClick={() => addNote(text)}>Add a new Note</button>
    </div>
  )
}

export default Home
