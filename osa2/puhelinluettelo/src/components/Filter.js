import React from 'react'

const Filter = ({newFilter, handleNoteChange3}) => {
    return (
        <form> 
            <div>
            filter shown with:
            <input 
            value={newFilter} 
            onChange={handleNoteChange3}
            />
            </div>
      </form> 
    )
  }

  export default Filter