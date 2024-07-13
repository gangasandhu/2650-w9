import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Note from './components/Note';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      text
    }
  }
`;

const ADD_NOTE = gql`
  mutation AddNote($text: String!) {
    addNote(text: $text) {
      id
      text
    }
  }
`;

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $text: String!) {
    editNote(id: $id, text: $text) {
      id
      text
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_NOTES);
  const [addNoteMutation] = useMutation(ADD_NOTE, {
    refetchQueries: [GET_NOTES]
  });
  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [GET_NOTES]
  });
  const [updateNoteMutation] = useMutation(UPDATE_NOTE, {
    refetchQueries: [GET_NOTES]
  });

  const addNote = async (text) => {
    await addNoteMutation({ variables: { text } });
  };

  const deleteNote = async (id) => {
    await deleteNoteMutation({ variables: { id } });
  };

  const updateNote = async (updatedNote) => {
    await updateNoteMutation({ variables: { id: updatedNote.id, text: updatedNote.text } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home notes={data.notes} addNote={addNote} deleteNote={deleteNote} />} />
          <Route path="/about" element={<About />} />
          <Route path="/note/:id" element={<Note notes={data.notes} updateNote={updateNote} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
