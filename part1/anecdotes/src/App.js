import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0) 
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <Label text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <Button text="vote" handleClick={addVote} />
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))} />
      <Label text="Anecdote with most votes" />
      <div>{anecdotes[votes.indexOf(Math.max.apply(Math, votes))]}</div>
    </>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Label = ({ text }) => <h1>{text}</h1>

export default App