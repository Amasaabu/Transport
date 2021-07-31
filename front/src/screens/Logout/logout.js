import React from 'react'
import* as actions from '../../store/actions/'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    dispatch(actions.Logout())
    return (
        <div>
            <Redirect to='/'/>
        </div>
    )
}

export default Logout
