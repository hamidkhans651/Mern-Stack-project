import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import SearchAndFilters from '../components/SearchAndFilters'
import Spinner from '../components/Spinner'
import { getTasks, reset } from '../features/tasks/taskSlice'

function Tasks() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  )

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showStarredOnly, setShowStarredOnly] = useState(false)

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Status filter
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus
      
      // Starred filter
      const matchesStarred = !showStarredOnly || task.starred
      
      return matchesSearch && matchesStatus && matchesStarred
    })
  }, [tasks, searchTerm, filterStatus, showStarredOnly])

  const handleSearch = (value) => {
    console.log('Search called with:', value)
    setSearchTerm(value)
  }

  const handleFilter = (status, starred = showStarredOnly) => {
    console.log('Filter called with:', status, starred)
    if (typeof status === 'string') {
      setFilterStatus(status)
    }
    if (typeof starred === 'boolean') {
      setShowStarredOnly(starred)
    }
  }

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

  console.log('Rendering Tasks component with SearchAndFilters')

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Tasks Dashboard</p>
      </section>

      <div style={{ border: '2px solid blue', padding: '10px', margin: '10px 0', backgroundColor: 'lightblue' }}>
        <h3>Test: Tasks page is rendering</h3>
        <p>Search term: {searchTerm}</p>
        <p>Filter status: {filterStatus}</p>
        <p>Show starred only: {showStarredOnly.toString()}</p>
      </div>

      <div style={{ border: '2px solid purple', padding: '10px', margin: '10px 0', backgroundColor: 'lightpink' }}>
        <h3>About to render SearchAndFilters component</h3>
      </div>

      {/* Simple inline test component */}
      <div style={{ 
        border: '5px solid green', 
        padding: '20px', 
        margin: '20px 0', 
        backgroundColor: 'lightgreen',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        <h1 style={{ color: 'green', textAlign: 'center' }}>INLINE SEARCH TEST</h1>
        <input
          type='text'
          placeholder='Inline search test...'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ 
            padding: '15px', 
            width: '300px',
            border: '3px solid blue',
            fontSize: '16px'
          }}
        />
        <p>Current search: {searchTerm}</p>
      </div>

      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        showStarredOnly={showStarredOnly}
      />

      <div style={{ border: '2px solid orange', padding: '10px', margin: '10px 0', backgroundColor: 'lightyellow' }}>
        <h3>SearchAndFilters component should be above this</h3>
      </div>

      <TaskForm />

      <section className='content'>
        {filteredTasks.length > 0 ? (
          <div className='tasks'>
            {filteredTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        ) : tasks.length > 0 ? (
          <h3>No tasks match your current filters</h3>
        ) : (
          <h3>You have not created any tasks</h3>
        )}
      </section>
    </>
  )
}

export default Tasks 