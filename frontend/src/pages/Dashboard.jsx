import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import TaskItem from '../components/TaskItem'
import TaskFormPopup from '../components/TaskFormPopup'
import Spinner from '../components/Spinner'
import { getTasks, reset } from '../features/tasks/taskSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getTasks())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Your Tasks</p>
      </section>

      <section className='content'>
        <div className='dashboard-header'>
          <button 
            className='btn btn-block add-task-btn' 
            onClick={() => setIsPopupOpen(true)}
          >
            <FaPlus /> Add New Task
          </button>
        </div>

        {tasks.length > 0 ? (
          <div className='tasks'>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <div className='no-tasks'>
            <h3>You have not created any tasks yet</h3>
            <p>Click the "Add New Task" button to get started!</p>
          </div>
        )}
      </section>

      <TaskFormPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  )
}

export default Dashboard
