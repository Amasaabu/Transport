import React from 'react'
import classes from './button.module.css'

export const Button = (props)=>{
    let style = [classes.button]
    if (props.btnDisabled) {
        style.push(classes.btnDisabled)
    }
    return (
        <>
            <button disabled={props.btnDisabled} onClick={props.clicked} className={style.join(' ')}>{props.children}</button>
        </>
    )
}

export const LogInBtn = (props)=>{
    let style = [classes.logInBtn]
    if (props.btnDisabled) {
        style.push(classes.logInBtnDisabled)
    }
    return (
        <>
            <button disabled={props.btnDisabled} onClick={props.clicked} className={style.join(' ')}>{props.children}</button> 
        </>
    )
}