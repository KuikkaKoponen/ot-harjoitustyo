import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Filter from './components/Filter'
import Add from './components/Add'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'notes')

  const handleNoteChange1 = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNoteChange2 = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNoteChange3 = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  // en saanut checkiä toimimaan omassa luokassa
  const check = () => {
    console.log('')
    const filtered = persons.filter(person => person.name === newName)
    if(filtered.length === 0) {
      return false
    } else {
      return true
    }
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log(event.target.value)

    if (check()) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }


  const filtered = persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleNoteChange3={handleNoteChange3} />
      
      <h2>Add new</h2>
      <Add onSubmit={addNote} value={newName} onChange={handleNoteChange1} value2={newNumber} onChange2={handleNoteChange2} />
      <h2>Numbers</h2>
      <ul>
        {filtered.map((note) =>
          <Note key={note.name} note={note} />
        )}
      </ul>
    </div> 
  )

}

export default App