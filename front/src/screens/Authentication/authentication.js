import React, {useState} from 'react'
import classes from './authentication.module.css'
import Signin from './Signin/signin'
import Signup from './signup/signup'
import* as actions from '../../store/actions/index'
import {useDispatch,useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import withErrorHandler from '../../hoc/withErrorHandler'
const Authentication = (props) => {
    const [isSignup, setisSignup] = useState(true)
    const dispatch = useDispatch()

    const UserState = useSelector(state => state.UserReducer)
    const Authenticate = (email, password, t)=>{
        const data = {
            email,
            password,
            t
        }
        const method = isSignup
        dispatch(actions.AuthenticateUser(data, method))
        console.log(data)
       
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
                    {isSignup ? <Signup loading={UserState.loading} Auth={Authenticate} /> : <Signin loading={UserState.loading} Auth={Authenticate}/>}
                {/* <div className={classes.btn}><LogInBtn Auth={Authenticate}>Log-In</LogInBtn></div> */}
            <h3 onClick={()=>setisSignup(!isSignup)} className={classes.switch}>{isSignup?'*Already Have an Account?':'*Creat an Account'}</h3>
            </div>
        </div>
        </>
    )
}

export default withErrorHandler(Authentication)
