import React from 'react'
import classes from './update.module.css'

const Update = (props) => {
    return (
        <div className={classes.container}>
            {props.content}
        </div>
    )
}


export default Update
