import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Box from '../../component/box/box'
import classes from './book.module.css'
import {useSelector, useDispatch} from 'react-redux'
import* as actions from '../../store/actions/index'
import Input from '../../component/input/input'
import CarImage from '../../asset/images/bus.png'
import {Button} from '../../component/button/button'
import Seatbox from '../../component/seatbox/seatbox'

const Book = (props) => {
    // props.match.params
   const {vehicle_id} = useParams()

    const dispatch = useDispatch()
    const searchResultState = useSelector(state => state.searchBusReducer)
    
    const {searchResult} = searchResultState

    //we have to initialze this with this values for the first render when array is empty
    let result_obj = {depature :{}, destination: {}, seatsavailable: []}
    searchResult.forEach((it)=>{
        for (const iterator in it) {
            result_obj[iterator] = it[iterator] 
        }
    })
    
    const [form1, setform1] = useState({
        Name: {
            value: '',
            label: 'Name',
            type: 'input'
        },
        Address: {
            value: '',
            label: 'Adress',
            type: 'input'
        },
        Email: {
            value: '',
            label: 'Email',
            type: 'email'
        }
    })
    const form_1 = Object.keys(form1).map((it) => {
        return (
            <Input
                type={form1[it].type}
                box
                value={form1[it].value}
                label={form1[it].label}
                changed={(event) => {
                    setform1({
                        ...form1,
                        [it]: {
                            ...form1[it],
                            value: event.target.value
                        }
                    })
                }} />
        )
    })
    //because want to divide it into two sides based on flexbox
    const [form2, setform2] = useState({
        PhoneNumber: {
            value: '',
            label: 'Phone number',
            type: 'tel'
        },
        NextofKin: {
            value: '',
            label: 'Next of Kin',
            type: 'input'
        },
        NextofKinPhoneNumber: {
            value: '',
            label: 'Next of kin phone number',
            type: 'tel'
        }
    })
    const form_2 = Object.keys(form2).map((it) => {
        return (
            <Input
                type={form2[it].type}
                box
                value={form2[it].value}
                label={form2[it].label}
                changed={(event) => {
                    setform2({
                        ...form2,
                        [it]: {
                            ...form2[it],
                            value: event.target.value
                        }
                    })
                }} />
        )
    })
    const [selectedSeat, setSelectedSeat] = useState([])

    const Submit = ()=>{
        const data = {
            name: form1.Name.value,
            adress: form1.Address.value,
            vehicle_id,
            phonenumber: form2.PhoneNumber.value,
            nextofkin: form2.NextofKin.value,
            nextofkinphonenumber: form2.NextofKinPhoneNumber.value,
            seatsposition: selectedSeat
        }
        console.log(data)
        dispatch(actions.CreateInvoice(data))
        props.history.push(`/invoice`)
    }
    useEffect(() => {
        const data = {_id: vehicle_id}
        dispatch(actions.searchBus(data))
    }, [dispatch, vehicle_id])

     return (
        <div className={classes.container}>
            <div className={classes.busDetails}>
                    <Box>
                        <div className={classes.busDetailsContainer}>
                            <img width='250px' height='250px' src={CarImage} alt=''/>
                             <div className={classes.items}>
                                 <div className={classes.depature}>
                                     <h2 className={classes.ident}>Depature</h2>
                                     <p className={classes.val} >{`${result_obj.depature.state}, ${result_obj.depature.address}`}</p>
                                 </div>
                                 <div className={classes.destination}>
                                     <h2 className={classes.ident}>Destination</h2>
                                 <p className={classes.val}>{`${result_obj.destination.state}, ${result_obj.destination.address}`}</p>
                                 </div>
                                 <div className={classes.time}>
                                     <h2 className={classes.ident}>Depature Time</h2>
                                 <p className={classes.val}>{result_obj.time}</p>
                                 </div>
                            </div>
                        </div>
                    </Box>
                </div>
             <div className={classes.form}>
                    <Box>
                        <div className={classes.formContainer}>
                            <div>{form_1}</div> 
                            <div>{form_2}</div>
                        </div>
                    </Box>
                </div>
                <div className={classes.seatForm}>
                    <Box>
                        <h1 className={classes.header}>Select Seat</h1>
                        <div className={classes.arrangement}>
                            {
                            result_obj.seatsavailable.map((it)=>{
                                return (
                                <Seatbox 
                                {...it}
                                selected = {selectedSeat.find(iterator=>iterator.seat_id===it._id)}
                                unselect={()=>{
                                    const already_selected = selectedSeat.filter(iterator => iterator.seat_id !== it._id)
                                    setSelectedSeat([...already_selected])
                                }}
                                clicked={() => {
                                    setSelectedSeat([
                                        ...selectedSeat,
                                        { seat_id: it._id }
                                    ])
                                }}
                                />
                                )
                            })}
                        </div>
                    </Box>
                </div>
             <div className={classes.submitBtn}><Button clicked={Submit}>Book Now</Button></div>

            </div>
            
       
    )
}

export default Book
