import React from 'react'
import classes from "./userHome.module.css";
import {useSelector} from 'react-redux'


const UserHome = (props) => {
    const options = [{ tag: 'print E-ticket', url: '/invoice' }, { tag: 'Edit Profile', url: '' }, { tag: 'Cart', url: '' }, { tag: 'Information', url: '/' }, { tag: 'Saved Payment Options', url: '' }, {tag: 'Log-out', url: '/logout'}]
    const UserState = useSelector(state => state.UserReducer)
    console.log(UserState)

    const wrapClick = (to)=>{
        props.history.push(`${to}`)
    }
    return (
        <>
        <h1 className={classes.name}>Welcome, <span>{UserState.userData.surname}</span></h1>
        <div className={classes.container}>
            {options.map((it)=>{
                return(
                <div onClick={()=>wrapClick(it.url)} key={it.tag} className={classes.item}>
                    <div className={classes.link} to={it.url}><p>{it.tag}</p></div> 
                </div>
                )
            })}
        </div>
        </>
    )
}

export default UserHome
