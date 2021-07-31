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