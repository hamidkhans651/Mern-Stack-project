import React from 'react'

function TaskFilters({ onSearch, onFilter, searchTerm, filterStatus, showStarredOnly }) {
  console.log('TaskFilters component rendered')

  return (
    <div style={{ 
      border: '5px solid red', 
      padding: '20px', 
      margin: '20px 0', 
      backgroundColor: 'yellow',
      fontSize: '18px',
      fontWeight: 'bold'
    }}>
      <h1 style={{ color: 'red', textAlign: 'center' }}>SEARCH AND FILTERS ARE HERE!</h1>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Search Tasks: </label>
        <input
          type='text'
          placeholder='Type to search tasks...'
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          style={{ 
            padding: '10px', 
            marginLeft: '10px', 
            width: '200px',
            border: '2px solid blue'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Filter by Status: </label>
        <select
          value={filterStatus}
          onChange={(e) => onFilter(e.target.value)}
          style={{ 
            padding: '10px', 
            marginLeft: '10px',
            border: '2px solid green'
          }}
        >
          <option value='all'>All Status</option>
          <option value='pending'>Pending</option>
          <option value='in-progress'>In Progress</option>
          <option value='completed'>Completed</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type='checkbox'
            checked={showStarredOnly}
            onChange={(e) => onFilter(filterStatus, e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          Show starred tasks only
        </label>
      </div>
    </div>
  )
}

export default TaskFilters 