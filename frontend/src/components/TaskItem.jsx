import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../features/tasks/taskSlice'

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: new Date(task.dueDate).toISOString().slice(0, 16),
    status: task.status,
  })

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateTask({ id: task._id, taskData: editData }))
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending'
      case 'in-progress':
        return 'status-progress'
      case 'completed':
        return 'status-completed'
      default:
        return ''
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className='task'>
      {!isEditing ? (
        <>
          <div className='task-header'>
            <h3>{task.title}</h3>
            <div className='task-actions'>
              <button
                onClick={() => setIsEditing(true)}
                className='btn btn-edit'
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task._id))}
                className='close'
              >
                X
              </button>
            </div>
          </div>
          <p className='task-description'>{task.description}</p>
          <div className='task-details'>
            <span className='task-date'>
              <strong>Due:</strong> {formatDate(task.dueDate)}
            </span>
            <span className={`task-status ${getStatusColor(task.status)}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
          <div className='task-created'>
            Created: {formatDate(task.createdAt)}
          </div>
        </>
      ) : (
        <div className='task-edit'>
          <input
            type='text'
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className='form-control'
          />
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            className='form-control'
            rows='3'
          />
          <input
            type='datetime-local'
            value={editData.dueDate}
            onChange={(e) =>
              setEditData({ ...editData, dueDate: e.target.value })
            }
            className='form-control'
          />
          <select
            value={editData.status}
            onChange={(e) =>
              setEditData({ ...editData, status: e.target.value })
            }
            className='form-control'
          >
            <option value='pending'>Pending</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
          <div className='edit-actions'>
            <button onClick={handleUpdate} className='btn btn-save'>
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='btn btn-cancel'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem 