import React, { useState, useEffect  } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'

const App = () => {
  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      //id: notes.length + 1,
    }

    noteService
      .getAll()
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes //ehto 1, jos showAll true
    : notes.filter(note => note.important === true) //ehto 2, , jos showAll false. == true voi jättää pois
   
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
    .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    }) .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}> 
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        {notesToShow.map((note, i) =>
          <Note 
            key={i} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}> 
        <input 
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App