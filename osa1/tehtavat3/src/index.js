import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)  //Ilmeisesti useState viittaaminen vain App sisällä
  const min = 0;
  const max = anecdotes.length-1
  const [points, setPoints] = useState(Array(max).fill(0))
  const [aMostVotes, setAnecdote] = useState(anecdotes[0])
  const [winner, setWinner] = useState(0) 
  
  const mostVotes = () => { 
    var max = points[0];
    var maxIndex = 0;

    for (var i = 1; i < points.length; i++) {
        if (points[i] > max) {
            maxIndex = i;
            max = points[i];
        }
    }
    return ( 
      <div>
        {setAnecdote(anecdotes[maxIndex])}
        {setWinner(maxIndex)}
      </div>  
    )
  }

  const setNew = () => { 
    let random = Math.round(min + (Math.random() * (max - min)))
    console.log('selected ', random)
    return ( 
      <div>
        {setSelected(random)}
      </div>
      
    )
  }
  
  const vote = () => { 
    const copy = [...points]   
    copy[selected] += 1
    
    console.log('vote given to ', selected)
    return ( 
      <div>
        {setPoints(copy)}
        {mostVotes()}
      </div>
      
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p> has {points[selected]} votes</p>
      
      <button onClick={setNew}>
        {'next anecdote'}
      </button>
    
      <button onClick={vote}>
        {'vote'}
      </button>

      <h1>Anecdote with most votes</h1>    
      {aMostVotes}
      <p>has {points[winner]} points</p>
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)