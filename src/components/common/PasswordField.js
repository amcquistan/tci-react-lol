import React from 'react';

import PropTypes from 'prop-types';

const PasswordField = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = 'form-group';
  if (error) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className='field'>
        <div className='input-group mb-2'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fa fa-lock' aria-hidden="true"></i>
            </span>
          </div>
          <input
            type='password'
            name={name}
            className='form-control'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        
        {error && <div className='text-danger ml-3'>{error}</div>}
      </div>
    </div>
  );
};

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default PasswordField;
