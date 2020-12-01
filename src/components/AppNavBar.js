// components/AppNavBar.js

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { checkAuthStatus } from "../redux/actions/authActions";


class AppNavBar extends Component {
  async componentDidMount() {
    try {
      await this.props.checkAuthStatus();
    } catch (e) {
      console.log('Error checking authenication', e)
    }
  }

  renderNavLinks() {
    return (
        <>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
            <Nav variant='pills' defaultActiveKey='/signup'>
              {this.props.auth.isAuthenticated ? 
                (<Nav.Link as={NavLink} to='/logout'>Log Out</Nav.Link>)
                :
                (<>
                  <Nav.Link as={NavLink} to='/signup'>Sign Up</Nav.Link>
                  <Nav.Link as={NavLink} to='/login'>Log In</Nav.Link>
                </>)}
            </Nav>
          </Navbar.Collapse>
        </>
      );
  }

  render() {
    return (
      <Navbar bg='primary' expand='lg'>
        <Navbar.Brand as={NavLink} to='/'>Lots of Lists</Navbar.Brand>
        {this.renderNavLinks()}
      </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);
