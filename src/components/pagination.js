import React from 'react';
import './table.css';

const Pagination = ({ page, totalPages, onPageChange, pageSizeOptions, nextpage, previouspage }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= 3; i++) {
      pages.push(
        <button key={i} onClick={() => onPageChange(i)} className={i === page ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
    <div class='sea'>
      <div  class='cen'>
        <button class = 'col' onClick={() => previouspage()} disabled={page === 1}>
          Previous
        </button>      
        {` ${page} `}
        <button class = 'col' onClick={() => nextpage()} disabled={page === 3}>
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Pagination;