import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <>
        <Label text="give feedback" />
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <Label text="statistics" />
        <div>No feedback given</div>
      </>
    )
  }
  return (
    <>
      <Label text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Label text="statistics" />
      <StatisticLine text="good" value={good} add="" />
      <StatisticLine text="neutral" value={neutral} add="" />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} add="" />
      <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} add="" />
      <StatisticLine text="positive" value={good / (good + neutral + bad) * 100} add="%" />
    </>
  )
}

const Label = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick} >{text}</button>

const StatisticLine = ({ text, value, add }) => <div>{text} {value} {add}</div>

export default App