import React from 'react'
import classes from './input.module.css'

const Input= (props)=>{
    let input = ''
    let labelStyle
    let inputStyle
    
    if (props.box) {
        inputStyle = [classes.inputB]
        labelStyle = [classes.labelB]
    } else {
        inputStyle = [classes.input]
        labelStyle = [classes.label]
    }
    let label = <label className={labelStyle.join(' ')}>{props.label}</label>
    if (props.bigLabel) {
         label = <label className={labelStyle.join(' ')}><h3>{props.label}</h3></label>
         inputStyle = [classes.bigLabel]
    }
        switch (props.type) {
            case 'input':
               input=( <>
                    {label}
                    <input onChange={props.changed} value={props.value} className={inputStyle.join(' ')} type='input'></input>
                </>)
                break
            case 'email':
                input = (<>
                    {label}
                    <input onChange={props.changed} value={props.value} className={inputStyle.join(' ')} type='email'></input>
                </>)
                break
            case 'number':
                input = (<>
                    {label}
                    <input onChange={props.changed} value={props.value} className={inputStyle.join(' ')} type='number'></input>
                </>)
                break;

            case 'password':
              input= (  <>
                   {label}
                  <input onChange={props.changed} value={props.value} className={inputStyle} type='password'></input>
                </>
              )
                break;
            case 'suggestion':
                input = (<>
                    {label}
                    <input onChange={props.changed} value={props.value} className={classes.input} list='items' type='input'></input>
                    <datalist id='items'>
                        {props.suggestArray.map((it)=>{
                        return (<option key={it._id} value={`${it.state},${it.address}`}/>)})
                    }
                    </datalist>
                </>
                )
                break;  
            case 'date':
                input = (<>
                    {label}
                    <input onChange={props.changed} value={props.value} className={classes.input} type='date'></input>
                </>
                )
                break;   
            default:
                input = (<>
                    {label}
                    <input onChange={props.changed} value={props.value} className={inputStyle} type='input'></input>
                </>)
                break;
        }
    return (
        <>
            {input}
        </>
    )
}
export default Input