import React from 'react'

const Note = ({country, toggleImportance}) => {
    
    return (
        <li>   
            {country.name}
            <button onClick={toggleImportance}>Show</button>     
        </li>
    )
  }
  export default Note
