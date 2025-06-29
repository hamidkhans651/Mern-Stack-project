import axios from 'axios'

const API_URL = '/api/tasks/'

// Create new task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log('Creating task with data:', taskData)
  const response = await axios.post(API_URL, taskData, config)
  console.log('Task created:', response.data)

  return response.data
}

// Get user tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log('Getting tasks from:', API_URL)
  const response = await axios.get(API_URL, config)
  console.log('Tasks received:', response.data)

  return response.data
}

// Update user task
const updateTask = async (taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log('Updating task:', taskId, 'with data:', taskData)
  const response = await axios.put(API_URL + taskId, taskData, config)
  console.log('Task updated:', response.data)

  return response.data
}

// Delete user task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log('Deleting task:', taskId)
  const response = await axios.delete(API_URL + taskId, config)
  console.log('Task deleted:', response.data)

  return response.data
}

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
}

export default taskService 