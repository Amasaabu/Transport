import React, { useState, useEffect } from 'react'
import Input from '../../../component/input/input'
import {LogInBtn} from '../../../component/button/button'

const Signin = (props) => {
    const [inputForm, setInputForm] = useState({
        email: {
            label: 'Email',
            value: '',
            type: 'email',
            error: ''
        },
        password: {
            label: 'Password',
            value: '',
            type: 'password',
            error: ''
        }
    })
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [touched, settouched] = useState(false)

    useEffect(() => {
        if (touched) {
            if (!inputForm.email.error&&!inputForm.password.error) {
            console.log('ran')
            setBtnDisabled(false)
        } else {setBtnDisabled(true)}
        if (props.loading) {setBtnDisabled(true)}
        }
        
    }, [inputForm.email.error, inputForm.password.error, touched, props.loading])

    useEffect(() => {
       if (inputForm.email.value&&inputForm.password.value) settouched(true)
    }, [inputForm.email.value , inputForm.password.value])
    const errorCheckers = (inpValue, element) => {
        let error = ''
        if (element === 'password') {
            if (inpValue.length <= 0) {
                error = 'Invalid Password'

            } else {
                error = ''
            }
        }
        if (element === 'email') {
            const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
              if (!emailRegex.test(inpValue)) {
                error = 'Invalid Email Entered'
            }
            else {
                error = ''
            }
        }
        return error
    }
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
                            value: val,
                            error: errorCheckers(val, it)
                        }
                        })
                        
                    }}  
                    error = {inputForm[it].error}
                    value={inputForm[it].value} 
                    type={inputForm[it].type} label={inputForm[it].label} />
                )
            })}
            <div style={{ height: '40px', marginTop: '10px' }}><LogInBtn btnDisabled={btnDisabled} clicked={()=>props.Auth(inputForm.email.value, inputForm.password.value)}>Log-In</LogInBtn></div> 
        </>
    )
}

export default Signin
