import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // alert
      showAlert(true, 'please enter a value', 'danger')
    } else if (name && isEditing) {
      // edit
    } else {
      showAlert(true, 'item added', 'success')
      let newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }
  const clearItems = () => {
    showAlert(true, 'list is empty', 'danger')
    setList([])
  }
  const removeItem = (id) => {
    showAlert(true, 'item removed', 'danger')
    setList(list.filter((item) => item.id !== id))
  }

  return <section
    className='section-center'>
    <form
      className='grocery-form'>
      {alert.show && <Alert {...alert} list={list} showAlert={showAlert} />}
      <h3>groceries</h3>
      <div
        className="form-control">
        <input
          type="text"
          className='grocery'
          placeholder='e.g. milk'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <button
          onClick={handleSubmit}
          className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && (
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} />
        <button className='clear-btn' onClick={clearItems}>
          clear items
      </button>
      </div>
    )}
  </section>
}

export default App
