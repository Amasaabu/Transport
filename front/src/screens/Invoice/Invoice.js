import React, {useState, useEffect} from 'react'
import classes from './invoice.module.css'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler'
import {useParams} from 'react-router-dom'

const Invoice = () => {
    //when redirected from invoices by userInvoice
    const dispatch = useDispatch()
    const params = useParams()
    const {id} = params
    useEffect(() => {
        if (id) {
            dispatch(actions.SearchInvoice(id))
        }
    }, [dispatch, id, ])
    
    let invoice
    const InvoiceReducer = useSelector(state => state.InvoiceReducer)
    const { invoiceData } = InvoiceReducer
    const [searchvalue, setsearchvalue] = useState()
    const invoice_object = {vehicle_id: {depature: '',destination: ''},seatsposition: [],...invoiceData}
    const date = new Date(invoice_object.vehicle_id.depaturedate)
    // to structure seat number
    const seats = invoice_object.seatsposition.map((it)=>{
    return (<span key={it.position}>{it.position},</span>)
    })
    console.log(invoice_object)
    if (invoiceData._id) {
         invoice = (
            <>
                 <h2>Invoice</h2>
                 <div className={classes.invoiceContainer}>
                 <div className={classes.tagContainer}>
                     <div>Name</div>
                     <div>Date</div>
                     <div>Depature</div>
                     <div>Destination</div>
                     <div>Amount to Be Paid</div>
                     <div>Invoice Id</div>
                     <div>seats:</div>
                 </div>
                 <div className={classes.items}>
                    <div>{invoice_object.name}</div>
                    <div>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, ${invoice_object.vehicle_id.time}`}</div>
                    <div>{`${invoice_object.vehicle_id.depature.state}, ${invoice_object.vehicle_id.depature.address}`}</div>
                    <div>{`${invoice_object.vehicle_id.destination.state},${invoice_object.vehicle_id.destination.address}`}</div>
                    <div>{`${invoice_object.amounttobepaid}`}</div>
                    <div>{`${invoice_object._id}`}</div>
         <div>{seats}</div>
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

export default withErrorHandler(Invoice)
