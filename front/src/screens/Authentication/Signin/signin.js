import React, { useState } from 'react'
import Input from '../../../component/input/input'
import {LogInBtn} from '../../../component/button/button'

const Signin = (props) => {
    const [inputForm, setInputForm] = useState({
        email: {
            label: 'Email',
            value: '',
            type: 'email'
        },
        password: {
            label: 'Password',
            value: '',
            type: 'password'
        }
    })
    return (
        <>
            {Object.keys(inputForm).map((it) => {
                return (
                <Input key={inputForm[it].label} changed = {(event)=>{
                        const val = event.target.value
                        setInputForm({
                        ...inputForm,
                        [it]:{
                        ...inputForm[it],
                        value: val
                        }
                        })
                    }}  
                    value={inputForm[it].value} 
                    type={inputForm[it].type} label={inputForm[it].label} />
                )
            })}
            <div style={{ height: '40px', marginTop: '10px' }}><LogInBtn clicked={()=>props.Auth(inputForm.email.value, inputForm.password.value)}>Log-In</LogInBtn></div> 
        </>
    )
}

export default Signin
