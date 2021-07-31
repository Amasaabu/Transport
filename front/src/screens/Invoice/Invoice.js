import React, {useState} from 'react'
import classes from './invoice.module.css'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'

const Invoice = () => {
    // let url = '/invoice'
    let invoice
    const InvoiceReducer = useSelector(state => state.InvoiceReducer)
    const { invoiceData } = InvoiceReducer
    const [searchvalue, setsearchvalue] = useState()
    const dispatch = useDispatch()
    const invoice_object = {vehicle_id: {depature: '',destination: ''},...invoiceData}
    const date = new Date(invoice_object.vehicle_id.depaturedate)
    console.log(invoice_object)
    if (invoiceData._id) {
         invoice = (
            <>
                 <h2>Invoice</h2>
                 <div className={classes.invoiceContainer}>
                 <div className={classes.tagContainer}>
                     <div>Name</div>
                     <div>Date</div>
                     <div>Depature Information</div>
                     <div>Destination Information</div>
                     <div>Amount to Be Paid</div>
                 </div>
                 <div className={classes.items}>
                    <div>{invoice_object.name}</div>
                    <div>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
                    <div>{`${invoice_object.vehicle_id.depature.state}, ${invoice_object.vehicle_id.depature.address}`}</div>
                    <div>{`${invoice_object.vehicle_id.destination.state},${invoice_object.vehicle_id.destination.address}`}</div>
                    <div>{`${invoice_object.amounttobepaid}`}</div>
                 </div>
                <div className={classes.payStatus}><h3>Payment Status:<span >{invoiceData.status}</span></h3></div>
                 </div>
                 <h2>Payment Details</h2>
                 <div className={classes.invoiceContainer}>
                     <div className={classes.tagContainer}>
                         <div>Name</div>
                         <div>Mode of Payment</div>
                         <div>Date of payment</div>
                         <div>Amount Paid</div>
                     </div>
                     <div className={classes.items}>
                         <div>{invoiceData.name}</div>
                         <div>{invoiceData.paymentmethod}</div>
                        <div>{'NOT AVAILABLE'}</div>
                         <div>{invoiceData.amountpaid}</div>
                      
                     </div>
                 </div>
            </>
           
        )
    } else {
        invoice = <h2>Please Input Invoice Id in the search box</h2>
    }
    const searchBtn=()=>{
        const input = searchvalue
        dispatch(actions.SearchInvoice(input))
    }
    return (
        <>
        <div className={classes.container}>
            <div className={classes.searchbox}>
            <label className={classes.label}><h2>Invoice Id:</h2></label>
                <input onChange={(event)=>{
                    setsearchvalue(event.target.value)
                }} value={searchvalue} className={classes.input}/>
                <button onClick={searchBtn} className={classes.btn}>Search</button>
            </div>
            {invoice}
        </div>
        </>
    )
}

export default Invoice
