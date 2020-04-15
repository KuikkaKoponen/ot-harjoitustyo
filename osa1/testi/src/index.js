import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([]) // tekee tyhjän taulukon

  const handleLeftClick = () => {
    setAll(allClicks.concat('L')) // tekee uuden taulukon kopioi vanhan ja lisää perään L:n
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R')) // tekee uuden taulukon kopioi vanhan ja lisää perään R:n
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)