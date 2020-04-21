import React from 'react'

const Add = ({onSubmit, value, onChange, value2, onChange2}) => {
    return (
        <form onSubmit={onSubmit}> 
        <div>
        name:
        <input 
          value={value} 
          onChange={onChange}
        />
        </div>
        <div>
         number:
        <input 
          value={value2} 
          onChange={onChange2}
        />
        </div>
        <button type="submit">add</button>
      </form> 
    )
  }

  export default Add