// components/LogoutPage.js

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

function LogoutPage({ logoutUserAction }) {
  const history = useHistory();
  useEffect(() => {
    logoutUserAction().then(() => {
      history.push('/login')
    })
  }, []);

  return (
    <>
      <h1>Logging Out ...</h1>
    </>
  );
}

const mapDispatchToProps = {
  logoutUserAction: logoutUser
};

export default connect(null, mapDispatchToProps)(LogoutPage);
