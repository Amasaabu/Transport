import React from 'react'
import classes from './navitem.module.css'

const NavItem = (props) =>{
    return (
       <div className={classes.container}>
        <a href={props.link}>{props.display}</a>
    </div> 
    )
    
}

export default NavItem