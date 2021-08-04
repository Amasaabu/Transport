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
    let error
    if (props.error) {
         error = <span className={classes.error}>{props.error}</span>
    }
        switch (props.type) {
            case 'input':
               input=( <>
                    {label}
                    <input onChange={props.changed} value={props.value} className={inputStyle.join(' ')} type='input'></input>
                    {error}
                </>)
                break
            case 'email':
                input = (<>
                    {label}
                    <input onChange={props.changed} value={props.value} className={inputStyle.join(' ')} type='email'></input>
                    {error}
                </>)
                break
            case 'number':
                input = (<>
                    {label}
                    <input onChange={props.changed} value={props.value} className={inputStyle.join(' ')} type='number'></input>
                    {error}
                </>)
                break;

            case 'password':
              input= (  <>
                   {label}
                  <input onChange={props.changed} value={props.value} className={inputStyle} type='password'></input>
                  {error}
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