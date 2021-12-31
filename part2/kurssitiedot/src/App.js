import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }, 
      {
        name: "Redux",
        exercises: 11,
        id: 4
      },
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => 
        <Part part={part} key={part.id} /> 
      )}
      <Total parts={parts} />
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((partsum, part) => partsum + part.exercises, 0)
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

export default App