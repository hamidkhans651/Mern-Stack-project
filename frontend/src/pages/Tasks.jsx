import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import Spinner from '../components/Spinner'
import { getTasks, reset } from '../features/tasks/taskSlice'

function Tasks() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  )

  useEffect(() => {
    console.log('Tasks component mounted')
    console.log('User:', user)
    console.log('Tasks state:', { tasks, isLoading, isError, message })

    if (isError) {
      console.log('Error in tasks:', message)
    }

    if (!user) {
      navigate('/login')
      return
    }

    console.log('Dispatching getTasks')
    dispatch(getTasks())

    return () => {
      console.log('Tasks component unmounting, dispatching reset')
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  console.log('Tasks component render - isLoading:', isLoading)

  if (isLoading) {
    console.log('Showing spinner')
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Tasks Dashboard</p>
      </section>

      <TaskForm />

      <section className='content'>
        {tasks.length > 0 ? (
          <div className='tasks'>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <h3>You have not created any tasks</h3>
        )}
      </section>
    </>
  )
}

export default Tasks 