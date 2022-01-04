import React from 'react'

const Person = (props) => {
    return (
        <p>{props.name} {props.number} <button id={props.id} onClick={props.handleClick}>delete</button></p>
    )
}

export default Person