import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckoOut from './containers/CheckOut/CheckOut';
import { Route, Switch, Redirect } from 'react-router-dom'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions'
class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>)
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={CheckoOut}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      )
    }
    return (
      <div className="App" >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
