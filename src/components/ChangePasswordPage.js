// components/RequestChangePasswordPage.js

import React, { useState } from 'react';
import EmailField from './common/EmailField';
import PasswordField from './common/PasswordField';
import TextField from './common/TextField';

import { changePassword } from '../redux/actions/authActions';
import { connect } from 'react-redux';

function ChangePasswordPage({ history, changePasswordAction, auth }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handleCodeChange(event) {
    setCode(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleForgotPassword(event) {
    event.preventDefault();
    try {
      await changePasswordAction({ email, code, password });
      history.push('/login');
    } catch (e) {
      console.log('Error logging in', e);
    }
  }

  return (
    <>
      <h1>Change Password</h1>

      <form onSubmit={handleForgotPassword}>
        <p>Enter email associated with your account, the confirmation code, and your new password.</p>

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
          <TextField 
            name='code'
            label='Code'
            value={code}
            placeholder='Verification Code'
            onChange={handleCodeChange}
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

        <button type='submit' className='btn btn-primary' disabled={!email}>
          Login
        </button>

      </form>
    </>
  );
}

const mapDispatchToProps = {
  changePasswordAction: changePassword
};

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordPage);
