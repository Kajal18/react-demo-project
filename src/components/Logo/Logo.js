import React from 'react'
import logo from '../../assets/images/burger.jpg'
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={logo} alt="Burger Builder" />
    </div>
)

export default Logo