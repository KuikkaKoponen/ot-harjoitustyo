import React from 'react'
import Note from './Note'

const Filter = ({list}) => {
    console.log('jäljellä', list.length)
    const length = list.length


    if(length === 0) { 
        return (
            <ul>
                <li>No countries found</li>
            </ul> 
        )
    }
    else if(length === 1) {
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
            </div>
        )
    } else if(length > 1 && length < 10) {
        return (      
                <div> 
                    {list.map((country) =>
                    <Note key={country.name} country={country} /> 
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

  export default Filter