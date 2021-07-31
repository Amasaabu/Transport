import React, {useState} from 'react'
import classes from './authentication.module.css'
import Signin from './Signin/signin'
import Signup from './signup/signup'
import* as actions from '../../store/actions/index'
import {useDispatch,useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Authentication = (props) => {
    const [isSignup, setisSignup] = useState(true)
    const dispatch = useDispatch()

    const UserState = useSelector(state => state.UserReducer)
    console.log(UserState)
    const Authenticate = (email, password)=>{
        const data = {
            email,
            password
        }
        const method = isSignup
        dispatch(actions.AuthenticateUser(data, method))
       
    }
    let url = '/auth'
    if (UserState.userData.email) {
        url='/userHome'
    }
    return (
        <>
        <Redirect to={url}/>
        <div className={classes.container}>
            <h1 className={classes.lead}>Travel Nigeria Today</h1>
            <div className={classes.form}>
                {isSignup?<Signup Auth={Authenticate}/>:<Signin Auth={Authenticate}/>}
                {/* <div className={classes.btn}><LogInBtn Auth={Authenticate}>Log-In</LogInBtn></div> */}
            <h3 onClick={()=>setisSignup(!isSignup)} className={classes.switch}>{isSignup?'*Already Have an Account?':'*Creat an Account'}</h3>
            </div>
        </div>
        </>
    )
}

export default Authentication
