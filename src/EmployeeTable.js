import React, { useState, useEffect } from 'react';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) throw new Error();
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        alert('failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const goToPreviousPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div>
      <h2>Employee Data Table</h2>

      <table data-testid="employee-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#008061', color: '#fff' }}>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((emp) => (
            <tr key={emp.id}>
              <td style={cellStyle}>{emp.id}</td>
              <td style={cellStyle}>{emp.name}</td>
              <td style={cellStyle}>{emp.email}</td>
              <td style={cellStyle}>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button
          data-testid="prev-button"
          onClick={goToPreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>

        <span data-testid="current-page" style={{ margin: '0 10px' }}>
          {page}
        </span>

        <button
          data-testid="next-button"
          onClick={goToNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left',
};

export default EmployeeTable;
