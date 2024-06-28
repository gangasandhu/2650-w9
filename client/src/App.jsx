import './App.css'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Note from './components/Note'


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/note/:id" element={<Note />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
