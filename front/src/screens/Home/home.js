import React, {useState, useEffect} from 'react'
import { Button } from '../../component/button/button'
import Input from '../../component/input/input'
import classes from './home.module.css'
import {useSelector,useDispatch} from 'react-redux'
import BookItems from '../../component/BookItems/bookItems'
import {Route} from 'react-router-dom'
import Updates from '../../component/Updates/updates'
import* as actions from '../../store/actions/index'
import* as actionTypes from '../../store/actions/actionTypes'
// import Line from '../../component/svg/Line/line'

const Home = (props)=>{
   
    const [form, setForm] = useState({
        date: {
            label: 'Date',
            value: '',
            type: 'date'
        },
        depature: {
            label: 'Depature',
            value: '',
            type: 'suggestion',
            suggestArray: []
        },
        destination: {
            label: 'Destination',
            value: '',
            type: 'suggestion',
            suggestArray: []
        },
        maxpassangers: {
            label: 'Number of Passangers',
            value: '',
            type: 'number'
        }
    })
    const dispatch = useDispatch()
    // const Userstate = useSelector(state => state.UserReducer)
    const searchResultState = useSelector(state=>state.searchBusReducer)
    const allLocations = useSelector(state=>state.getLocationReducer)
    const {locations} = allLocations

    const {searchResult, loading} = searchResultState
  
    const formData = Object.keys(form).map((it)=>{
        return (
            <Input
            key={it}
            label={form[it].label}
            value={form[it].value}
            type= {form[it].type}
            suggestArray={form[it].suggestArray}
            changed={(e)=>{
                const val = e.target.value
                setForm({
                    ...form,
                    [it]: {
                        ...form[it],
                        value: val
                    }
                })
            }}/>
        )
    })
  
    const updates = [{
        content: 'REDUCED PASSANGER LOAD DUE TO COVID-19, till Futher notice'
    }, {
        content: 'ATTENTION: LAGOS TO KANO NOW AVAILABLE TWICE A DAY'
    },
    {
        content: 'PRICES HAVE CHANGED, CONFIRM WITH YOUR LOCAL AGENT'
    }]
    
    const searchAction = ()=>{
        console.log('searching')
        //this function gets id from the value of suggestion list.
        const findIdFromAdress = (input, array)=>{
            const inputArray = input.split(',')
            const item = array.find((it)=>{
                //ensures we find based on state and adress in the case of states with more than one address
                if (it.state === inputArray[0] && it.address === inputArray[1]) {
                    return true
                } else {
                    return false
                }
            })
            if (!item) {
                return ''
            }
            return item._id
        }
        const depature_id = findIdFromAdress(form.depature.value, locations)
        const destination_id = findIdFromAdress(form.destination.value, locations)
        const data = {
            depaturedate: form.date.value,
            depature: depature_id,
            destination: destination_id,
            maxpassangers: form.maxpassangers.value
        }
        dispatch(actions.searchBus(data))
        props.history.push('/search')
    }

    useEffect(() => {
        dispatch(actions.getAllLocation())
        return ()=>{
            console.log('reseting Search')
            dispatch({type:actionTypes.SEARCH_BUS_RESET})
        }
    }, [dispatch])

    useEffect(() => {
        console.log('use EFfect 2')
      setForm((latestForm)=>{
          return {
              ...latestForm,
              destination: {
                  ...latestForm.destination,
                  suggestArray: locations
              }
          }
      })
      setForm((latestForm) => {
            return {
                ...latestForm,
                depature: {
                    ...latestForm.depature,
                    suggestArray: locations
                }
            }
        })
      
    }, [locations])
    const toBook = (vehicle_id)=>{
        props.history.push(`/book/${vehicle_id}`)
    } 
    
    return (
        <>
            
            <div className={classes.container}>
                <div className={classes.subContainer}>
                    <div className={classes.updates}>
                        <Route exact path='/' render={()=> <Updates contents={updates}/>} />
                    </div>
                    <div className={classes.bookItems}>
                        <Route path='/search' render={() => <BookItems clicked={toBook} bookItems={searchResult} />} />
                    </div>
                </div>
                <div className={classes.book}>
                  <h1>Book now</h1> 
                  <div className={classes.form}>
                        {formData}
                        <div className={classes.btn}><Button btnDisabled={loading} clicked={searchAction} >NEXT</Button></div> 
                  </div>
                </div>
            </div>
        </>
    )
}

export default Home

