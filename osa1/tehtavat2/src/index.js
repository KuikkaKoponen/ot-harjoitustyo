import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGood = () => {
    console.log('klikattu good')
    return (   
      setGood(good +1)
    )   
  }

  const increaseNeutral = () => {
    console.log('klikattu neutral');
    return (
      setNeutral(neutral +1)
    )   
  }  

  const increaseBad = () => {
    console.log('klikattu bad');
    return (
      setBad(bad +1)
    ) 
  }

  return (
    <div>
      <h1> give feedback</h1>
      <Button
        handleClick={increaseGood} // Lähetetään funktio
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />
      <Button
        handleClick={increaseBad}
        text='bad'
      />     
      <Statistics
        good={good} // Lähetetään tila
        neutral={neutral}
        bad={bad}  
      />      
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => { // atribuutit voidaan antaa myös paloina (ei tarvii kirjottaa propsei)
  const sum = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*-1) / sum
  const positive = sum / good + ' %'
  
  if (sum < 1) {
   return (
      <div> 
        <h1> statistics</h1> No feedback given
      </div>
    ) 
  }
  return (
    <div>
      <h1> statistics</h1>
      <table> 
        <tr>
          <th>Information</th>
          <th>Value</th>
        </tr>        
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={sum}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive} />
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr> 
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>   
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)