import React from "react"
import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, showEmpty } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdote.value))
        dispatch(showNotification(`Added ${event.target.anecdote.value}`))
        setTimeout(() => dispatch(showEmpty()), 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={add}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm