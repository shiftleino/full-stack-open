import React from "react"

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
        <h2>{text}</h2>
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

export default Course