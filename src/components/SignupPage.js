// components/SignupPage.js

import React, { useState } from 'react';
import EmailField from './common/EmailField';
import PasswordField from './common/PasswordField';

import { signupUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';

function SignupPage({ history, signupUserAction, auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (event.target.value && event.target.value !== password2) {
      setPassword2Error('Passwords do not match');
    } else {
      setPasswordError('')
      setPassword2Error('')
    }
  }
  function handlePassword2Change(event) {
    setPassword2(event.target.value);

    if (event.target.value && password && password !== event.target.value) {
      setPassword2Error('Passwords do not match');
    } else {
      setPassword2Error('')
    }
  }
  async function handleSignup(event) {
    event.preventDefault();
    try {
      await signupUserAction({ email, password });
      history.push('/signup-confirm');
    } catch (e) {
      console.log('Error signing up', e);
    }
  }

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        {auth.signUpErrorMessage && (<p className='alert alert-warning'>{auth.signUpErrorMessage}</p>)}
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
            error={passwordError}
            onChange={handlePasswordChange}
          />
        </div>

        <div className='form-group'>
          <PasswordField 
            name='password2'
            label='Password Verification'
            value={password2}
            placeholder='Password verification'
            error={password2Error}
            onChange={handlePassword2Change}
          />
        </div>
        
        <ul>
          <li>Password must be at least 8 characters</li>
          <li>Password must have at least one Uppercase Letter</li>
          <li>Password must have at least one Lowercase Letter</li>
          <li>Password must have at least one number</li>
          <li>Password must have at least one special symbol (!, @, #, ect ...)</li>
        </ul>

        <button type='submit' className='btn btn-primary' disabled={!email || !password || password !== password2}>
          Sign Up
        </button>
      </form>
    </>
  );
}

const mapDispatchToProps = {
  signupUserAction: signupUser
};

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
