import React, {useState, useEffect} from 'react'
import { LogInBtn } from '../../../component/button/button'
import Input from '../../../component/input/input'


const Signup = (props) => {
    const [inputForm, setInputForm] = useState({
        email: {
            label: 'Email',
            value: '',
            type: 'email'
        },
        confirmEmail: {
            label: 'Re-enter Email',
            value: '',
            type: 'email',
            error: ''
        },
        password: {
            label: 'Password',
            value: '',
            type: 'password',
            error: '',
            
        }
    })
    const [btnDisabled,setbtnDisabled] = useState(true)
    const[touched, setTouched] = useState(false)
    const errorCheckers = (inpValue, element)=>{
        let error = ''
        if (element==='password') {
            if (inpValue.length<=6) {
                error = 'password characters cannot be less than 6'
                
            }
            else {
                error = ''
            }
        }
        if (element==='confirmEmail') {
            if (inpValue!==inputForm.email.value) {
                error = 'Confirm email input'
            } else {
                error = ''
            }
        }
        return error
    }
  useEffect(() => {
      if (touched) {
        if (!inputForm.confirmEmail.error&&!inputForm.password.error) {
          setbtnDisabled(false)
      } else {
          setbtnDisabled(true)
      }     
    if (props.loading) {
        setbtnDisabled(true)
    }
      } 
      
  }, [inputForm.confirmEmail.error, inputForm.password.error, touched, props.loading])

  useEffect(() => {
      if (inputForm.confirmEmail.value && inputForm.password.value) {
        setTouched(true)
      }
  }, [setTouched, inputForm.confirmEmail.value, inputForm.password.value])

    return (
        <>
            {Object.keys(inputForm).map((it)=>{
                return (
                    <Input key={inputForm[it].label} changed={(event)=>{
                        const val = event.target.value 
                        setInputForm((form)=>{
                            return {
                                ...form,
                                [it]: {
                                    ...form[it],
                                    value: val,
                                    error: errorCheckers(val, it)
                                },
                            } 
                        }) 
                
                        // control2(val, it)
                        // control(val, it)
                           
                    }}
                    error = {inputForm[it].error}
                    value={inputForm[it].value} 
                    type={inputForm[it].type}
                     label={inputForm[it].label}/>
                )
            })}
            <div style={{ height: '40px', marginTop: '10px' }}><LogInBtn btnDisabled={btnDisabled} clicked={()=>props.Auth(inputForm.email.value, inputForm.password.value, inputForm.confirmEmail.value)}>Sign-up</LogInBtn></div> 
        </>
        
    )
}

export default Signup
