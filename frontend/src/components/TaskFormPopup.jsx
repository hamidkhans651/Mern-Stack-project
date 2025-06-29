import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'
import { FaTimes } from 'react-icons/fa'

function TaskFormPopup({ isOpen, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    if (!title || !description || !dueDate) {
      alert('Please fill in all fields')
      return
    }

    dispatch(createTask({ title, description, dueDate, status }))
    setTitle('')
    setDescription('')
    setDueDate('')
    setStatus('pending')
    onClose()
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setDueDate('')
    setStatus('pending')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='popup-overlay' onClick={handleClose}>
      <div className='popup-content' onClick={(e) => e.stopPropagation()}>
        <div className='popup-header'>
          <h2>Add New Task</h2>
          <button className='popup-close' onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Task Title</label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter task title'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter task description'
              rows='3'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='dueDate'>Due Date</label>
            <input
              type='datetime-local'
              name='dueDate'
              id='dueDate'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select
              name='status'
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='pending'>Pending</option>
              <option value='in-progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
          <div className='popup-actions'>
            <button className='btn btn-block' type='submit'>
              Add Task
            </button>
            <button 
              type='button' 
              className='btn btn-reverse btn-block' 
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPopup 