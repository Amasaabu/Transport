import axios from 'axios'
import* as actionType from './actionTypes'

export const AuthenticateUser = ( input, method)=>{
    return async dispatch=>{
        dispatch({type: actionType.BEFORE_AUTHENTICATE_USER})
        try {
            const url = method?'/api/user/signup':'/api/user/signin'
            const {data} = await axios.post(url, input)
            console.log(data)
            sessionStorage.setItem('userData', JSON.stringify(data))
            dispatch({type: actionType.AFTER_AUTHENTICATE_USER, data})
        } catch (error) {
            dispatch({type: actionType.AUTHENTICATE_USER_ERROR})
            console.log(error)
        }
    }
}


export const Logout = ()=>{
    return dispatch=>{
        try {
            sessionStorage.removeItem('userData')
            dispatch({type: actionType.LOG_OUT})
        } catch (error) {
            console.log(error)
        }
    }
}