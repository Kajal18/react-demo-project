import React, { useState } from 'react'
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)
    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return (
        <React.Fragment>
            <div>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    toggleClick={sideDrawerToggleHandler}>
                </Toolbar>
                <SideDrawer closed={sideDrawerToggleHandler} open={showSideDrawer}></SideDrawer>
            </div>
            <main className={classes.Context}>
                {props.children}
            </main>
        </React.Fragment>
    )
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null ? true : false
    }
}

export default connect(mapStateToProps)(Layout)