import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggler from '../SideDrawer/DrawerToggle/DrawerToggler';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.toggleClick}></DrawerToggler>
        <div className={classes.Logo}>
            <Logo></Logo>
        </div>
        <nav className={classes.DeskTopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
    </header>
)

export default Toolbar