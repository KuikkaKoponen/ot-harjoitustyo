import React from 'react'

const Note = ({country}) => {
    
    const onSubmit = () => {
        // tätä en saanut toimimaan
    }

    return (
        <form onSubmit={onSubmit()}>   
            {country.name}
            <button type="submit">show</button>
        </form>
    )
  }
  export default Note