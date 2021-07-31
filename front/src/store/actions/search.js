import axios from 'axios'
import * as actionTypes from './actionTypes'

export const searchBus = (searchParams)=>{
    return async dispatch=>{
        try {
            dispatch({type: actionTypes.BEFORE_SEARCH_BUS})
            const { data } = await axios.post('/api/vehicle/search', searchParams)
            dispatch({type: actionTypes.AFTER_SEARCH_BUS, data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionTypes.SEARCH_BUS_ERROR})
        }
    }
}

export const getAllLocation = ()=>{
    return async dispatch=>{
        try {
            dispatch({type: actionTypes.BEFORE_GET_ALL_LOCATIONS})
            const {data} = await axios.get('/api/location')
            dispatch({type: actionTypes.AFTER_GET_ALL_LOCATIONS, data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionTypes.GET_ALL_LOCATION_ERROR})
        }
    }
}