import { useState } from 'react'

const Anecdote = (props) => {
  return(
    <>
    <div>
      {props.anecdotes[props.selected]} 
    </div>
    <p>has {props.votes[props.selected]} votes</p>
    </>
  )

}

const App = () => {
    const initVotes = () => {
    const arr = Array(anecdotes.length).fill(0)
    console.log("init: ",arr)
    return arr
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)
  const [highest, setHighest] = useState(0)

  const voteAnecdote = () => {
    const copy = [...votes]
    console.log("before: ", copy)
    copy[selected] += 1
    console.log("after: ", copy)
    setVotes(copy)
    determineHighestVoted(copy)
  }

  const nextAnectdote = () => {
    let random = selected;

    do {
      random = Math.floor(Math.random() * (anecdotes.length));
    } while (random == selected);
    
    setSelected(random)
  }

  const determineHighestVoted = (input) => {
    const calc = Math.max(...input)
    const highestIndex = input.indexOf(calc)
    console.log("calc ", calc)
    console.log("highest " ,highestIndex)
    setHighest(highestIndex)
  }
    
  return (
    <>
    <Anecdote anecdotes={anecdotes} votes={votes} selected={selected}/>
    <button onClick={voteAnecdote}>vote</button>
    <button onClick={nextAnectdote}>next anectode</button>
    <br/>
    <Anecdote anecdotes={anecdotes} votes={votes} selected={highest}/>
    </>
  )
}

export default App