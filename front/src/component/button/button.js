import React from 'react'
import classes from './button.module.css'

export const Button = (props)=>{
    return (
        <>
            <button onClick={props.clicked} className={classes.button}>{props.children}</button>
        </>
    )
}

export const LogInBtn = (props)=>{
    return (
        <>
            <button onClick={props.clicked} className={classes.logInBtn}>{props.children}</button> 
        </>
    )
}