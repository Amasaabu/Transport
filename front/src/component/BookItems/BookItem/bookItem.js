import React from 'react'
import classes from './bookItem.module.css'

const BookItems = (props) => {
    const date=new Date(props.depaturedate)
    // console.log(date)
    // console.log(props.depaturedate)
   const day = date.getDate()
   const month = date.getUTCMonth()
   const year = date.getFullYear()

    return (
        <div onClick={props.clicked} className={classes.container}>
            <img width='85px' height='100px' src="https://img.icons8.com/ios/100/000000/up-right-arrow.png" alt='#'/>
            <h3>{props.depature.state}</h3>
            <h5>
                <span>{props.time}</span>
                <span>{`${day}-${month+1}-${year}`}</span>
                <img src="https://img.icons8.com/material-rounded/35/000000/left-and-right-arrows.png" alt='#' />
            </h5>
            <h3>{props.destination.state}</h3>
            <img width='85px' height='80px' src="https://img.icons8.com/ios/100/000000/down-right-arrow.png" alt='#' />
            <p>{props.maxpassangers} seat</p>
        </div>
    )
}

export default BookItems
