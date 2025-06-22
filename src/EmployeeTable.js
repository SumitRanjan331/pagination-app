import React, { useState, useEffect } from 'react';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
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
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
    // Do nothing if already on last page
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    // Do nothing if already on first page
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Data Table</h2>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#008061', color: '#fff' }}>
            <th style={headerCellStyle}>ID</th>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Email</th>
            <th style={headerCellStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td style={cellStyle}>{item.id}</td>
              <td style={cellStyle}>{item.name}</td>
              <td style={cellStyle}>{item.email}</td>
              <td style={cellStyle}>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          data-testid="prev-button"
          onClick={handlePrevious}
          style={{
            ...buttonStyle,
            backgroundColor: '#008061',
            color: 'white'
          }}
        >
          Previous
        </button>

        <button
          data-testid="current-page"
          style={{
            ...buttonStyle,
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #008061'
          }}
        >
          {page}
        </button>

        <button
          data-testid="next-button"
          onClick={handleNext}
          style={{
            ...buttonStyle,
            backgroundColor: '#008061',
            color: 'white'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const headerCellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const cellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
};

const buttonStyle = {
  padding: '8px 16px',
  margin: '0 8px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default EmployeeTable;
