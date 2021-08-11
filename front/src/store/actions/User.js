import axios from 'axios'
import* as actionType from './actionTypes'

export const AuthenticateUser = (input, method) => {
    return async dispatch => {
        dispatch({ type: actionType.BEFORE_AUTHENTICATE_USER })
        try {
            const url = method ? 'api/user/signup' : 'api/user/signin'
            const { data } = await axios.post(url, input)
            sessionStorage.setItem('token', JSON.stringify(data.token))
            dispatch({ type: actionType.AFTER_AUTHENTICATE_USER, data })
        } catch (error) {
            dispatch({ type: actionType.AUTHENTICATE_USER_ERROR })
        }
    }
}
// export const AuthenticateUser = ( input, method)=>{
//     return async dispatch=>{
//         dispatch({type: actionType.BEFORE_AUTHENTICATE_USER})
//         try {
//             const url = method?'api/user/signup':'api/user/signin'
//             const {data} = await axios.post(url, input)
//             sessionStorage.setItem('userData', JSON.stringify(data))
//             dispatch({type: actionType.AFTER_AUTHENTICATE_USER, data})
//         } catch (error) {
//             dispatch({type: actionType.AUTHENTICATE_USER_ERROR})
//         }
//     }
// }


export const Logout = ()=>{
    return dispatch=>{
        try {
            sessionStorage.removeItem('token')
            dispatch({type: actionType.LOG_OUT})
        } catch (error) {
            console.log(error)
        }
    }
}

export const UpdateUserProfile = (inputData)=>{
    return async dispatch=>{
        try {
            //we are going to use autheticate_user actionType so that we can reuse its reducer
            dispatch({type: actionType.BEFORE_AUTHENTICATE_USER})
            const token_from_session = sessionStorage.getItem('token')
            const token =token_from_session?JSON.parse(token_from_session):''
            let {data} = await axios.patch('/api/user/edit',inputData, {
                headers: {
                    Authorization: token
                }
            })
            //ensure it is in the form expected by the user
            // data = {user: data} 
            dispatch({ type: actionType.AFTER_UPDATE_USER, data})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getUserDataFromToken = ()=>{
    return async dispatch=>{
        try {
        //we are going to use autheticate_user actionType so that we can reuse its reducer
        console.log('attemoting')
       
        const token_from_session = sessionStorage.getItem('token')
        const token = token_from_session ? JSON.parse(token_from_session) : ''
        if (token) {
            //to prevent sending unneccesary request
            dispatch({ type: actionType.BEFORE_AUTHENTICATE_USER })
            const { data } = await axios.get('/api/user/profile', {
                headers: {
                    Authorization: token
                }
            })
                dispatch({ type: actionType.AFTER_UPDATE_USER, data })
    }
    } catch (error) {
        console.log(error)
    }
    }
    
}