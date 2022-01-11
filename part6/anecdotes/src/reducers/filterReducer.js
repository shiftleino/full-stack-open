const initialState = ""

export const changeFilter = (filter) => {
    return {
        type: "SOME",
        data: { filter: filter }
    }
}

export const noFilter = () => {
    return {
        type: "NONE",
    }
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case "NONE":
            return ""
        case "SOME":
            return action.data.filter
        default: return state
    }
}

export default reducer