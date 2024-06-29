import './App.css'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Note from './components/Note'
import { useEffect, useState } from 'react'


function App() {


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

  const addNote = async (text) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ noteText: text })
      });
      const newNote = await response.json()
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  const updateNote = async (updatedNote) => {

    try {
      const response = await fetch(`http://localhost:3000/notes/${updatedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ noteText: updatedNote.text })
      });

      const updatedNotes = notes.map(note => (note.id == updatedNote.id ? updatedNote : note));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home notes={notes} addNote={addNote} deleteNote={deleteNote} />} />
          <Route path="/about" element={<About />} />
          <Route path="/note/:id" element={<Note notes={notes} updateNote={updateNote} />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
