// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/table'; // Proper casing
import Pagination from './components/pagination'; // Proper casing

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    fetchData();
  }, [search, sortedColumn, currentPage, pageSize]);

  const fetchData = async () => {
    try {
      let url = `http://localhost:5000/api/customers/paginated?page=${currentPage}&pageSize=${pageSize}`;

      if (search) {
        url += `&query=${search}`;
      }

      if (sortedColumn) {
        url += `&sortBy=${sortedColumn}`;
      }

      const response = await axios.get(url);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (term) => {
    setSearch(term);
  };

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortedColumn((prevSort) => (prevSort.startsWith('-') ? column : `-${column}`));
    } else {
      setSortedColumn(column);
    }
  };

  const PageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const PageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const nextpage = () => {
    PageChange(currentPage + 1);
  };

  const previouspage = () => {
    PageChange(currentPage - 1);
  };

  return (
    <div>
      <h1>Details of Customers</h1>
      {/* Proper component casing */}
      <Table customers={customers} onSort={handleSort} />
      {/* Proper component casing */}
      <Pagination
        page={currentPage}
        pageSize={pageSize}
        onPageChange={PageChange}
        onPageSizeChange={PageSizeChange}
        nextpage={nextpage}
        previouspage={previouspage}
      />
    </div>
  );
};

export default App;
