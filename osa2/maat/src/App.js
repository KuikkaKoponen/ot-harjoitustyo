import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCoutries] = useState([]) 
  const [ newList, setNewList ] = useState([])
  const [ newName, setNewName ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCoutries(response.data)
      })
  }, [])
  
  console.log('render', countries.length, 'countries')

  const handleNoteChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)   
    setNewName(event.target.value) // tässä nyt kestää jostain syystä, taitaa olla asynchronous  
    List(event.target.value) // Sen vuoksi kutsutaan funktiota event.target.value:lla eikä newName:lla

  }

  const List = (name) => {
    const list = countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    const length = list.length
    console.log(`${length} countries found`)  
    setNewList(list)

  }

  return (
    <div>
        <h1>Countries</h1>
            <div>
            Find countries:
            <input 
            value={newName} 
            onChange={handleNoteChange}
            />
            </div>       
        <Filter list={newList} />
    </div> 
  )

}

export default App