import { useState } from 'react'

const Statistics = ({good,neutral,bad,all,average,positive}) => {

    if (all != 0) {
      return(
      <>
      <h1>statistics</h1>  
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={all}></StatisticLine>
      <StatisticLine text="average" value={average}></StatisticLine>
      <StatisticLine text="positive" value={positive + ' %'}></StatisticLine>
      </>
      )

    }

  return (
      <>
      <h1>statistics</h1>  
      <p>No feedback given</p>
      </>
  )
}

const Button = (props) => {
  return (
  <>
  <button onClick={props.onClick}>{props.text}</button>
  </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
    <p>{props.text} {props.value}</p>
    </>
  )
}


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
      <Button onClick={increaseGood} text={"good"}></Button>
      <Button onClick={increaseNeutral} text={"neutral"}></Button>
      <Button onClick={increaseBad} text={"bad"}></Button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App