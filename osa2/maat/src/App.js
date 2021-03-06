import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

// käynnistä kutsulla REACT_APP_API_KEY= APIKOODI npm start

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [ countries, setCoutries] = useState([]) 
  const [ newList, setNewList ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ weather, setWeather ] = useState('')

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

  const toggleImportanceOf = (country) => {
    console.log('nimi pitäisi olla ' + country.name)
    setNewList([country])
  }

  const filter = () => {
    const length = newList.length
    console.log('Kakkoslistan pituus on ' + length)
    const list= newList.map(country => country)
  
    if(length === 0) { 
        return (
            <ul>
                <li>No countries found</li>
            </ul> 
        )
    }
    else if(length === 1) {
      // jostain syystä päivittää kutsua jatkuvalla syötöllä
      axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key+ '&query=' + list[0].capital)
      .then(response => {
        console.log(response.data.current.weather_descriptions)
        setWeather(response.data.current.weather_descriptions) 
      }).catch(error => {
        console.log('fail')
      })  
      
      return (           
            <div>
                <h1>{list[0].name}</h1>
                <ul>
                    <li>{`Capital is ${list[0].capital}`}</li>
                    <li>{`Population is ${list[0].population}`}</li>
                </ul> 
                <h2>Languages</h2>
                <ul>
                    {list[0].languages.map((language) => 
                        <li key = {language.name}>{language.name}</li>
                    )} 
                </ul> 
                <h2>Flag</h2>           
                <img src={list[0].flag} width="200" alt='flag' />
                <h2>Weather now in {list[0].capital} is: {weather}</h2>
            </div>
        )
    } else if(length > 1 && length < 10) {
        return (      
                <div> 
                    {list.map((country) =>
                    <Note key={country.name} country={country} toggleImportance = {() => toggleImportanceOf(country)} /> 
                    )} 
                </div>                
        )
    } else {
        return (
            <ul>
                <li>Over ten countries found, specify filter</li>
            </ul> 
        )
    }
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
            {filter()}
    </div> 
  )

}

export default App