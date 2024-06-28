import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes')
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.log("Error while fectching notes")
      }
    }

    getNotes()
  }, [])

  return (
    <div id='home'>

      <h1>YANT</h1>

      <div id='notes'>
        {notes.map(note => {
          return (
            <div>
              <div id='note'>
                <Link to={`/note/${note.id}`}>{note.text}</Link>
                <button>Delete</button>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <button>Add a new Note</button>
    </div>
  )
}

export default Home
