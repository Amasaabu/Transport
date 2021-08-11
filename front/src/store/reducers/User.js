import* as actionTypes from '../actions/actionTypes'

const data = sessionStorage.getItem('token')
const parsed_data = data ? JSON.parse(data) : {}
const initialState = {
    userData: {
        email: '',
        token: parsed_data
    },
    updated: false,
    loading: false,
    error: false
}

export const UserReducer = (state=initialState, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_AUTHENTICATE_USER:
            return {
                ...state,
                updated: false,
                loading: true
            }   
        case actionTypes.AFTER_AUTHENTICATE_USER:
            console.log(actions.data)
            return {
                ...state,
                loading: false,
                userData: actions.data.user
            }
        case actionTypes.AFTER_UPDATE_USER: {
            return {
                ...state,
                loading: false,
                updated: true,
                userData: actions.data
            }
        }
        case actionTypes.AUTHENTICATE_USER_ERROR: {
            return {
                ...state,
                loading: false
            }
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