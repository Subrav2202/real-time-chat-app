import { REGISTER_USER } from './userType'

const initialState = {
    user: []
};

export const userRedcuer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return (
                {
                    ...state,
                    user: action.payload
                }
            )
        default:
            return state
    }
}