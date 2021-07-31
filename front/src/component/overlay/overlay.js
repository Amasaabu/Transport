import React from 'react'
import classes from './overlay.module.css'

const Overlay = (props) => {
    let style = [classes.containerClosed]
    if (props.opened) {
        style.push(classes.containerOpened)
    }
    return (
        <div onClick={props.clicked} className={style.join(' ')}>
            
        </div>
    )
}

export default Overlay
