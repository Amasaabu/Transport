import React, {useState, useEffect} from 'react'
import Input from '../../component/input/input'
import classes from './editProfile.module.css'
import {Button} from '../../component/button/button'
import {useSelector, useDispatch} from 'react-redux'
import* as actions from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler'
const EditProfile = () => {
    
    const dispatch = useDispatch()
    const userReducer = useSelector(state => state.UserReducer)
    const [form, setForm] = useState({
        surname: {
            label: 'Surname',
            value: '',
            type: 'input'
        },
        email: {
            label: 'Email',
            value: '',
            type: 'email'
        },
        phoneNumber: {
            label: 'Phone Number',
            value: '',
            type: 'input'
        }
    })
    useEffect(() => {
        const what_to_update = ['surname', 'email', 'phoneNumber']
        what_to_update.forEach((it)=>{
            setForm((formState)=>{
                return {
                   ...formState,
                [it]: {
                    ...formState[it],
                    value: userReducer.userData[it]
                }
                }
                
            })
        })
        // eslint-disable-next-line
    }, [userReducer])
    
    const submitHandler =()=>{
        const data = {
            surname: form.surname.value,
            email: form.email.value,
            phoneNumber: form.phoneNumber.value
        }
        dispatch(actions.UpdateUserProfile(data))
    }
    return (
        <div className={classes.container}>
            {Object.keys(form).map((it)=>{
                return (
                    <Input value={form[it].value}
                    key={it}
                    label={form[it].label}
                    type={form[it].type}
                    changed={(event)=>{
                        setForm((formItem)=>{
                            return {
                                ...formItem,
                                [it]: {
                                    ...form[it],
                                    value: event.target.value
                                }
                            }
                        })
                    }}
                   />

                )
            })}
            <div  className={classes.btn}><Button clicked={submitHandler}>Submit</Button></div>
        </div>
    )
}

export default withErrorHandler(EditProfile)
