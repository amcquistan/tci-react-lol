// components/ListItem.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ListItem({ listId, name, completed, onDone, onRemove }) {
  return (
    <li className='list-group-item'>
      <dl className='row my-1'>
        <dt className='col-sm-10'>
          {completed && <span className='badge badge-success badge-pill'><i className="fa fa-check" aria-hidden="true"></i></span>}
          <span className='ml-2'>{name}</span>
        </dt>
        <dd className='col-sm-2 text-right'>
          {!completed && <button onClick={() => onDone(listId, name)} className="btn btn-success btn-sm mr-2">Done</button>}
          <button onClick={() => onRemove(listId, name)} className="btn btn-danger btn-sm">Remove</button>
        </dd>
      </dl>
    </li>
  );
}

ListItem.propTypes = {
  listId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default ListItem;
