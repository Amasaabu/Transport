import React from 'react'
import classes from './invoiceList.module.css'

const InvoiceList = (props) => {
    return (
        <div onClick={props.clicked} className={classes.container}>
        <div className={classes.invoice}>
            <div className={classes.from}>{props.from}</div>
            <img src="https://img.icons8.com/ios/100/000000/arrow.png" alt='right-arrow' />
            <div className={classes.to}>{props.to}</div>
        </div>
        <small>Number of Seats Booked:{props.seats}</small>
        </div>
    )
}

export default InvoiceList
