import* as actionTypes from './actionTypes'
import axios from 'axios'

export const CreateInvoice = (input, isAuthenticated)=>{
    return async dispatch=>{
        try {
            dispatch({type: actionTypes.BEFORE_POST_INVOICE})
            let url = '/api/vehicle/invoice'
            if (isAuthenticated) {
                url = '/api/vehicle/invoice/authenticated'
            }
            const token_from_session = sessionStorage.getItem('token')
            const token = token_from_session ? JSON.parse(token_from_session) : ''
            const { data } = await axios.post(url, input, { headers: { Authorization: token } })
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

export const getAllInvoiceByUser = () => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.BEFORE_GET_USER_INVOICES })
            const token_from_session = sessionStorage.getItem('token')
            const token = token_from_session ? JSON.parse(token_from_session) : ''
            const { data } = await axios.get('/api/user/invoices',{ headers: { Authorization: token } })
            dispatch({ type: actionTypes.AFTER_GET_USER_INVOICES, data })
        } catch (e) {
            
            console.log(e)
        }
    }
}