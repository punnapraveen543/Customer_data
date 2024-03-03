import React, { useState } from 'react';
import './table.css';
import Pagination from './pagination'; 
import moment from 'moment';

const Table = ({ customers, onSort, onPageChange, pageSizeOptions, nextpage, previouspage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState({ field: 'sno', order: 'asc' });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handle = (field) => {
    const order = sortOption.field === field && sortOption.order === 'asc' ? 'desc' : 'asc';
    setSortOption({ field, order });
    onSort({ field, order });
  };

  const sortedCustomers = () => {
    const { field, order } = sortOption;
    const sortedData = [...customers];

    if (field === 'date' || field === 'time') {
      sortedData.sort((a, b) => {
        const dateA = moment(a.created_at);
        const dateB = moment(b.created_at);

        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else {
      sortedData.sort((a, b) => {
        return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
      });
    }

    return sortedData;
  };

  const filteredCustomers = sortedCustomers().filter(rec => {
    return (
      rec.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.location.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more fields for search if needed
    );
  });

  return (
    <div>
      <div class="search">
        <input
          class="size"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
          
      </div>
      <table >
        <thead>
          <tr>
            <th onClick={() => handle('sno')}>Sno</th>
            <th onClick={() => handle('customer_name')}>Customer Name</th>
            <th onClick={() => handle('age')}>Age</th>
            <th onClick={() => handle('phone')}>Phone Number</th>
            <th onClick={() => handle('location')}>Location</th>
            <th onClick={() => handle('date')}>Date</th>
            <th onClick={() => handle('time')}>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((rec) => (
            <tr key={rec.sno}>
              <td>{rec.sno}</td>
              <td>{rec.customer_name}</td>
              <td>{rec.age}</td>
              <td>{rec.phone}</td>
              <td>{rec.location}</td>
              <td>{moment(rec.created_at).format('YYYY-MM-DD')}</td>
              <td>{moment(rec.created_at).format('HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      </div>
  );
};

export default Table;