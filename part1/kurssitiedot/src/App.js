import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
  const name = props.course
  return (
  <>
    <h1>{name}</h1>
  </>
  )
}

const Content = (props) => {
  return (
  <>
    <Part name={props.parts[0]} number={props.exercises[0]} />
    <Part name={props.parts[1]} number={props.exercises[1]} />
    <Part name={props.parts[2]} number={props.exercises[2]} />
  </>
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.name} {props.number}</p>
    </>
  )
}

const Total = (props) => {
  return (<>
    <p>Number of exercises {props.total}</p>
  </>
  )
}

export default App
