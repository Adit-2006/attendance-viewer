import React from 'react';

function Filters({ onFilterChange, activeFilter }) {
  const buttonStyles = (filterName) => `
    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border
    ${activeFilter === filterName 
      ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
  `;

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <span className="text-gray-500 text-sm font-semibold mr-2 uppercase tracking-wider">Filter By:</span>
      
      <button onClick={() => onFilterChange('all')} className={buttonStyles('all')}>
        All Students
      </button>

      <button onClick={() => onFilterChange('present')} className={buttonStyles('present')}>
        Present
      </button>

      <button onClick={() => onFilterChange('absent')} className={buttonStyles('absent')}>
        Absent
      </button>

      <button onClick={() => onFilterChange('low')} className={buttonStyles('low')}>
        Low Attendance (&lt;75%)
      </button>

      {/* "Show Selected" usually implies a toggle or a specific state */}
      <button onClick={() => onFilterChange('selected')} className={buttonStyles('selected')}>
        Show Selected
      </button>
    </div>
  );
}

export default Filters;