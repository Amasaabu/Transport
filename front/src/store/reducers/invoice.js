import* as actionTypes from '../actions/actionTypes'

const initialState = {
    invoiceData: {

    }
}

export const InvoiceReducer = (state=initialState, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_POST_INVOICE:
            return {
                ...state,
                loading: false
            }
        case actionTypes.AFTER_POST_INVOICE:
            return {
                ...state,
                invoiceData: actions.data,
                loading: true
            } 
        case actionTypes.POST_INVOICE_ERROR:
            return {
                ...state,
                loading: false
            }    
        default:
            return state
    }
}

export const UserInvoices = (state={loading: false, invoices: []}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_USER_INVOICES:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AFTER_GET_USER_INVOICES:
            console.log(actions.data) 
            return {
                ...state,
                loading: false,
                invoices: actions.data
            }
        default:
            return state;
    }
}