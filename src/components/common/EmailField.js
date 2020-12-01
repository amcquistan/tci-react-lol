import React from 'react';

import PropTypes from 'prop-types';

const EmailField = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = 'form-group';
  if (error && error.length) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className='field'>
        <div className='input-group mb-2'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fa fa-user' aria-hidden="true"></i>
            </span>
          </div>
          
          <input
            type='email'
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

EmailField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default EmailField;
