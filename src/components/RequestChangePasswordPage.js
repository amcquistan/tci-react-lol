// components/RequestChangePasswordPage.js

import React, { useState } from 'react';
import EmailField from './common/EmailField';

import { requestChangePassword } from '../redux/actions/authActions';
import { connect } from 'react-redux';

function RequestChangePasswordPage({ history, requestChangePasswordAction, auth }) {
  const [email, setEmail] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  async function handleRequestChangePassword(event) {
    event.preventDefault();
    try {
      await requestChangePasswordAction({ email });
      history.push('/change-password');
    } catch (e) {
      console.log('Error logging in', e);
    }
  }

  return (
    <>
      <h1>Request Password Reset</h1>

      <form onSubmit={handleRequestChangePassword}>
        <p>Enter email associated with your account and you'll recieve a link to reset your password.</p>

        <div className='form-group'>
          <EmailField
            name='email'
            label='Email'
            value={email}
            placeholder='Email'
            onChange={handleEmailChange}
          />
        </div>

        <button type='submit' className='btn btn-primary' disabled={!email}>
          Submit
        </button>

      </form>
    </>
  );
}

const mapDispatchToProps = {
  requestChangePasswordAction: requestChangePassword
};

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestChangePasswordPage);
