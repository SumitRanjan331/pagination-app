import React, { useState, useEffect } from 'react';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!res.ok) throw new Error();
        const result = await res.json();
        setData(result);
      } catch (error) {
        alert('failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <h2>Employee Data Table</h2>

      <table data-testid="employee-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#008061', color: '#fff' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((employee) => (
            <tr key={employee.id}>
              <td style={tdStyle}>{employee.id}</td>
              <td style={tdStyle}>{employee.name}</td>
              <td style={tdStyle}>{employee.email}</td>
              <td style={tdStyle}>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          data-testid="prev-button"
        >
          Previous
        </button>
        <span data-testid="current-page" style={{ margin: '0 10px' }}>{page}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const thStyle = { padding: '10px', border: '1px solid #ccc' };
const tdStyle = { padding: '10px', border: '1px solid #ccc' };

export default EmployeeTable;
