// components/LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailField from './common/EmailField';
import PasswordField from './common/PasswordField';

import { loginUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';

function LoginPage({ history, loginUserAction, auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  async function handleLogin(event) {
    event.preventDefault();
    try {
      await loginUserAction({ email, password });
      history.push('/');
    } catch (e) {
      console.log('Error logging in', e);
    }
  }

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        {auth.authenticationErrorMessage && (<p className='alert alert-warning'>{auth.authenticationErrorMessage}</p>)}
        <div className='form-group'>
          <EmailField
            name='email'
            label='Email'
            value={email}
            placeholder='Email'
            onChange={handleEmailChange}
          />
        </div>

        <div className='form-group'>
          <PasswordField 
            name='password'
            label='Password'
            value={password}
            placeholder='Password'
            onChange={handlePasswordChange}
          />
        </div>

        <div className='field my-4'>
          <Link to='/request-change-password' className='btn btn-link'>Forgot password?</Link>
        </div>

        <button type='submit' className='btn btn-primary' disabled={!email || !password}>
          Login
        </button>
        
      </form>
    </>
  );
}

const mapDispatchToProps = {
  loginUserAction: loginUser
};

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
