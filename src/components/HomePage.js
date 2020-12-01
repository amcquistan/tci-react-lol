// components/HomePage.js

import React, { useEffect, useState } from 'react';
import { Card, Accordion, Button } from "react-bootstrap";
import TextField from './common/TextField';
import ListItem from './ListItem';

import { connect } from 'react-redux';
import { createList, fetchLists, updateList, deleteList } from "../redux/actions/listActions";

import _ from 'lodash';

function HomePage({ auth, lists, fetchListsAction, createListAction, updateListAction, deleteListAction }) {
  const [newListName, setNewListName] = useState('');
  const [newListItemName, setNewListItemName] = useState('');

  useEffect(() => {
    fetchListsAction();
  }, []);

  function handleNewListNameChange(event) {
    setNewListName(event.target.value);
  }

  function handleNewListItemNameChange(event) {
    setNewListItemName(event.target.value);
  }

  function checkListComplete(list) {
    list.completed = list.items.length === list.items.filter(item => item.completed).length
  }

  async function handleCreateNewList(event) {
    event.preventDefault();

    // dispatch create new list
    try {
      await createListAction({
        name: newListName,
        completed: false,
        items: []
      });
      fetchListsAction();
    } finally {
      // clear state
      setNewListName('');
    }
  }

  async function handleCreateNewListItem(event) {
    event.preventDefault();

    // dispatch create new list item
    const oldList = lists.find(l => l.id === event.target.dataset.listid);
    const newList = { ...oldList, items: oldList.items.concat([{ name: newListItemName, completed: false }]) };
    try {
      await updateListAction(newList);
    } finally {
      // clear state
      setNewListItemName('');
    }
  }

  async function handleListItemDone(listId, listItemName) {
    console.log('List Item Done ID', listId);
    console.log('List Item Done Item Name', listItemName);
    const oldList = lists.find(l => l.id === listId);
    const newList = {
      ...oldList,
      items: oldList.items.map(item => {
        const newItem = { ...item };
        if (newItem.name == listItemName) {
          newItem.completed = true;
        }
        return newItem;
      })
    };
    checkListComplete(newList);
    try {
      await updateListAction(newList);
    } catch(e){}
  }

  async function handleListItemRemove(listId, listItemName) {
    if (window.confirm('Are you sure you want to remove this item?')) {
      const oldList = lists.find(l => l.id === listId);
      const newList = { ...oldList, items: oldList.items.filter(item => item.name !== listItemName) };
      checkListComplete(newList);
      try {
        await updateListAction(newList);
      } catch(e){}
    }
  }

  async function handleRemoveList(id) {
    if (window.confirm('Are you sure you want to remove list?')) {
      try {
        await deleteListAction({ id })
        fetchListsAction();
      } catch(e) {}
    }
  }
  const sortedList = _.sortBy(lists, ['completed', 'name'])
  return (
    <>
      <h2 className='my-4 text-center'>Lots of Lists</h2>
      <form onSubmit={handleCreateNewList}>
        <TextField
          name='newListName'
          value={newListName}
          placeholder='new list name'
          onChange={handleNewListNameChange}
          showIcon={false}/>
      </form>
      <Accordion defaultActiveKey="0">
        {sortedList.map((item, i) => (
          <Card key={i + ''}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="list" eventKey={i + ''} size='lg' block>
                <dl className='row'>
                  <dt className="col-sm-11 text-left">
                    {item.completed ?
                      (<span className='badge badge-success badge-pill'><i className="fa fa-check" aria-hidden="true"></i></span>)
                      :
                      (<span className='badge badge-info badge-pill'>{item.items.length}</span>)}
                    <span className='ml-2'>{item.name}</span>
                  </dt>
                  <dd className='col-sm-1'>
                    <button onClick={() => handleRemoveList(item.id)} className='btn btn-danger'>Remove</button>
                  </dd>
                </dl>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i + ''}>
              <Card.Body>
                <form onSubmit={handleCreateNewListItem} data-listid={item.id}>
                  <TextField
                    name='newListItemName'
                    value={newListItemName}
                    placeholder='new list item name'
                    onChange={handleNewListItemNameChange}
                    showIcon={false}/>
                </form>

                <ul className='list-group'>
                  {item.items.map((li, j) => (
                    <ListItem
                      key={`${item.id}-${j}`}
                      listId={item.id}
                      name={li.name}
                      completed={li.completed}
                      onDone={handleListItemDone}
                      onRemove={handleListItemRemove}/>
                  ))}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
}

const mapDispatchToProps = {
  fetchListsAction: fetchLists,
  createListAction: createList,
  updateListAction: updateList,
  deleteListAction: deleteList
};

function mapStateToProps({ lists, auth }) {
  return {
    lists: lists.lists,
    auth: auth
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
