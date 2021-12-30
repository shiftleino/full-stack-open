import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Label text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Label text="statistics" />
      <Value text="good" value={good}/>
      <Value text="neutral" value={neutral} />
      <Value text="bad" value={bad} />
      <Sum good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Label = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick} >{text}</button>

const Value = ({ text, value }) => <div>{text} {value}</div>

const Sum = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  return (
    <div>all {sum}</div>
  )
}

const Average = ({ good, neutral, bad }) => {
  const average = (good - bad) / (good + neutral + bad)
  return (
    <div>average {average}</div>
  )
}

const Positive = ({ good, neutral, bad }) => {
  const pos = good / (good + neutral + bad) * 100
  return (
    <div>positive {pos}%</div>
  )
}


export default App