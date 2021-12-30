import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name}/>
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  const name = props.name
  return (
  <>
    <h1>{name}</h1>
  </>
  )
}

const Content = (props) => {
  return (
  <>
    <Part part={props.course.parts[0]} />
    <Part part={props.course.parts[1]} />
    <Part part={props.course.parts[2]} />
  </>
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Total = (props) => {
  const total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (<>
    <p>Number of exercises {total}</p>
  </>
  )
}

export default App
