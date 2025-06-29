import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import TaskItem from '../components/TaskItem'
import TaskFormPopup from '../components/TaskFormPopup'
import Spinner from '../components/Spinner'
import { getTasks, reset } from '../features/tasks/taskSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 6

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

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)
  const totalPages = Math.ceil(tasks.length / tasksPerPage)

  // Reset to first page when tasks change
  useEffect(() => {
    setCurrentPage(1)
  }, [tasks.length])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      )
    }

    return buttons
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
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
          <>
            <div className='tasks'>
              {currentTasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className='pagination'>
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className='pagination-btn'
                >
                  <FaChevronLeft />
                </button>

                {renderPaginationButtons()}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className='pagination-btn'
                >
                  <FaChevronRight />
                </button>

                <span className='pagination-info'>
                  Page {currentPage} of {totalPages} 
                  ({tasks.length} total tasks)
                </span>
              </div>
            )}
          </>
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
