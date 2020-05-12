import React from 'react'
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: true })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuthenticated}
                        toggleClick={this.sideDrawerToggleHandler}>

                    </Toolbar>
                    <SideDrawer closed={this.sideDrawerToggleHandler} open={this.state.showSideDrawer}></SideDrawer>
                </div>
                <main className={classes.Context}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null ? true : false
    }
}

export default connect(mapStateToProps)(Layout)