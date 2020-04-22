import React from 'react'

const Note = ({ note, toggleImportance  }) => {
    return (
      <li>
        {note.name} {note.number}
        <button onClick={toggleImportance}>Delete</button>
      </li>
    )
  }

  export default Note
