import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'

function TaskForm() {
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
  }

  return (
    <section className='form'>
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
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Task
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm 