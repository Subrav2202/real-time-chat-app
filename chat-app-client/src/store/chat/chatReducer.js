import { GET_CHAT_HISTORY } from './chatType'

const initialState = {
    chatHistory: []
};

export const chatRedcuer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHAT_HISTORY:
            return (
                {
                    ...state,
                    chatHistory: action.payload
                }
            )
        default:
            return state
    }
}