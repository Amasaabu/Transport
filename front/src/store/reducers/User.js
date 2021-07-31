import* as actionTypes from '../actions/actionTypes'

const data = sessionStorage.getItem('userData')
const parsed_data = data ? JSON.parse(data) : {}
const initialState = {
    userData: {
        email: '',
        ...parsed_data.user
    },
    authDone: false,
    loading: false,
    error: false
}

export const UserReducer = (state=initialState, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_AUTHENTICATE_USER:
            return {
                ...state,
                loading: true
            }   
        case actionTypes.AFTER_AUTHENTICATE_USER:
            console.log(actions.data)
            return {
                ...state,
                loading: false,
                userData: actions.data.user
            }
        case actionTypes.LOG_OUT: {
            return {
                ...state,
                loading: false,
                userData: {
                    email: ''
                }
            }
        }
        default:
            return state;
    }
}