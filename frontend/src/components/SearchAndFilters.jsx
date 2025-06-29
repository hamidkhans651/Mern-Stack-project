import React from 'react'

function SearchAndFilters({ onSearch, onFilter, searchTerm, filterStatus }) {
  return (
    <div className='task-filters'>
      <div className='filters-header'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search tasks by title...'
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className='search-input'
          />
        </div>
        <div className='filter-group'>
          <label htmlFor='status-filter'>Filter by Status:</label>
          <select
            id='status-filter'
            value={filterStatus}
            onChange={(e) => onFilter(e.target.value)}
            className='filter-select'
          >
            <option value='all'>All Status</option>
            <option value='pending'>Pending</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilters 