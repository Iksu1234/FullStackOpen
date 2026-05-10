import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log("increase good ", updatedGood)
    const updatedAll = all +1 
    setAll(updatedAll)
    calculateAverage(updatedGood,bad,updatedAll)
  }
  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log("increase neutral ", updatedNeutral)
    const updatedAll = all +1 
    setAll(updatedAll)
    calculateAverage(good,bad,updatedAll)
  }
  const increaseBad = () => {
    const updatedBad = bad + 1 
    setBad(updatedBad)
    console.log("increase bad ", updatedBad)
    const updatedAll = all +1 
    setAll(updatedAll)
    calculateAverage(good,updatedBad,updatedAll)
  }

  const calculateAverage = (paramGood, paramBad, paramAll) => {
    console.log("calc ", paramGood, paramBad, paramAll)
    const calcAverage = (paramGood - paramBad) / paramAll
    const positive = paramGood / paramAll * 100
    setAverage(calcAverage) 
    setPositive(positive)
  }

  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

export default App