import React from "react"
import { changeFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = (props) => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(changeFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter