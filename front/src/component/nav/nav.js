import React, {useState} from 'react'
import NavItem from '../Navitem/navitem'
import classes from './nav.module.css'
import {useSelector} from 'react-redux'
import Overlay from '../overlay/overlay'

const Nav = ()=>{
    const [drawerOpened, setdrawerOpened] = useState(false)
    const UserReducer = useSelector(state => state.UserReducer)
    const {userData} = UserReducer
    let AuthMode
    AuthMode = userData.surname?AuthMode='Menu':'Log-in'
    const navItems = [{ link: '/', display: 'Book now' }, { link: '/', display: 'Report An issue' }, { link: '/invoice', display: 'Invoice Details' }, { link: '/auth', display: AuthMode }]

    const navigationItems = navItems.map(it => <NavItem key={it.display} link={it.link} display={it.display} />)
    
    let MenuStyle = [classes.menuBox]
    let navStyle = [classes.navItems]
   
    if (drawerOpened) {
        MenuStyle = [classes.menuBoxHide]
        navStyle.push(classes.openNavBar)
    }
    const openNav = ()=>{
        setdrawerOpened(!drawerOpened)
        
    }

    return (
        <>
        <Overlay clicked={()=>setdrawerOpened(false)} opened={drawerOpened}/>
        <div className={classes.container}>
            <div onClick={openNav} className={MenuStyle.join(' ')}>Options</div>
            <div className={navStyle.join(' ')}>{navigationItems}</div>
        </div>
        </>
    )
}

export default Nav