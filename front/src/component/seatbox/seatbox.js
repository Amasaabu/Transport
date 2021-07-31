import React from 'react'
import classes from './seatbox.module.css'

const Seat = (props) => {
    let style = [classes.container]
    let func = props.clicked
    if (props.occupied) {
        style.push(classes.active)
    }
    if (props.selected) {
        style.push(classes.select)
        func = props.unselect
        
    }
    return (
        <div onClick={func} className={style.join(' ')}>
            <h2>{props.position}</h2>
        </div>
    )
}

export default Seat
