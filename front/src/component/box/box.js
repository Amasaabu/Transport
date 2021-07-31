import React from 'react'
import classes from './box.module.css'
const Box = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

export default Box
