import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Filter from './components/Filter'
import Add from './components/Add'
import noteService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
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
      const filtered = persons.filter(person => person.name === newName)
      const id = filtered[0].id
      const person = {name: newName, number: newNumber, id: id}
      
      if(window.confirm('Henkilö on jo puhelinluettelossa, päivitetäänkö numero?')) {
        console.log('updated')
        noteService
        .update(id, person).then(returned => {
          setPersons(persons.map(person => person.id !== id ? person : returned))
          setErrorMessage(
            `Person '${person.name}' updated`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('error in update')
          setErrorMessage(
            `Person '${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
      }      
    } else {
      const newPerson = {name: newName, number: newNumber}
      console.log('new created')
      noteService
        .create(newPerson)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          `Person '${newName}' added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    }
  }

  const toggleImportanceOf = (id) => {
    console.log(id + ' Poistetaan')
    if(window.confirm('Haluatko varmasti poistaa henkilön')) {
      noteService
        .remove(id)
        .then(response=> {
          console.log(`Response data ${response}`)
          setPersons(persons.filter(n => n.id !== id))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            `Person '${id}' removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

      })
      .catch(error => {
        console.log('error in delete')
        setErrorMessage(
          `Person '${id}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
    }
    

  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }


  const filtered = persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} handleNoteChange3={handleNoteChange3} />
      
      <h2>Add new</h2>
      <Add onSubmit={addNote} value={newName} onChange={handleNoteChange1} value2={newNumber} onChange2={handleNoteChange2} />
      <h2>Numbers</h2>
      <ul>
        {filtered.map((note) =>
          <Note key={note.name} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
    </div> 
  )

}

export default App