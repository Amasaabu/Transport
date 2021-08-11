import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import* as actions from '../../store/actions/index'
import InvoiceList from '../../component/invoiceList/invoiceList'
import classes from './userInvoice.module.css'
import withErrorHandler from '../../hoc/withErrorHandler'
const UserInvoice = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getAllInvoiceByUser())
    }, [])
    const fowardToInvoice = (id)=>{
        props.history.push(`/invoice/${id}`)
    }
    const UserInvoices = useSelector(state => state.UserInvoices)
    console.log(UserInvoices)
    const invoice = UserInvoices.invoices.map((it)=>{
        return (
            <InvoiceList clicked={()=>fowardToInvoice(it.invoice._id)} seats={it.invoice.seatsposition.length} to={it.invoice.vehicle_id.destination.state} from={it.invoice.vehicle_id.depature.state}/>
        )
        
    })
    return (
        <div className={classes.container}>
            {invoice}
        </div>
    )
}

export default withErrorHandler(UserInvoice)
