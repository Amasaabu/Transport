import* as actionTypes from './actionTypes'
import axios from 'axios'

export const CreateInvoice = (input)=>{
    return async dispatch=>{
        try {
            dispatch({type: actionTypes.BEFORE_POST_INVOICE})
            const {data} = await axios.post('/api/vehicle/invoice', input)
            console.log(data)
            dispatch({type: actionTypes.AFTER_POST_INVOICE, data})
        } catch(e) {
            dispatch({type: actionTypes.POST_INVOICE_ERROR})
            console.log(e)
        }
    }
}

export const SearchInvoice = (id)=>{
    return async dispatch =>{
        try {
            dispatch({type: actionTypes.BEFORE_POST_INVOICE})
            const {data} = await axios.get(`/api/vehicle/invoice/${id}`)
            dispatch({type: actionTypes.AFTER_POST_INVOICE, data})
        } catch (error) {
            dispatch({type: actionTypes.POST_INVOICE_ERROR})
        }
    }
}