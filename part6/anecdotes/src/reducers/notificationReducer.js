const initialState = ""

export const showNotification = (notification) => {
    return {
        type: "TEXT",
        data: { notification: notification }
    }
} 

export const showEmpty = () => {
    return {
        type: "EMPTY"
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case "EMPTY":
            return ""
        case "TEXT":
            return action.data.notification
        default: return state
    }
}

export default reducer