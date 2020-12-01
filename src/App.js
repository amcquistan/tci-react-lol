// App.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { checkAuthStatus } from "./redux/actions/authActions";

import AppNavBar from './components/AppNavBar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import SignupPage from './components/SignupPage';
import SignupConfirmPage from './components/SignupConfirmPage';
import RequestChangePasswordPage from './components/RequestChangePasswordPage';
import ChangePasswordPage from './components/ChangePasswordPage';


function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route 
      {...rest}
      render={props => authenticated ? <Component {...props}/> : <Redirect to='/login'/>}
    />
  );
}

class App extends Component {
  state = {
    isReady: false
  };
  async componentDidMount() {
    try {
      await this.props.checkAuthStatus();
    } catch (e) {
      console.log('Error checking authenication', e)
    }
    this.setState({ isReady: true });
  }

  render() {
    return this.state.isReady && (
      <div className="App">
        <Router>
          <AppNavBar/>
          <div className='container-fluid mt-4'>
            
            <Switch>
              <Route path="/login" component={LoginPage}/>
              <Route path="/signup" component={SignupPage}/>
              <Route path="/signup-confirm" component={SignupConfirmPage}/>
              <Route path="/logout" component={LogoutPage}/>
              <Route path="/request-change-password" component={RequestChangePasswordPage}/>
              <Route path="/change-password" component={ChangePasswordPage}/>
              <PrivateRoute path="/" exact component={HomePage} authenticated={this.props.auth.isAuthenticated}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuthStatus: () => dispatch(checkAuthStatus())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
