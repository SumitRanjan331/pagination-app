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

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Employee Data Table</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '90%' }}>
        <thead>
          <tr style={{ backgroundColor: '#008061', color: 'white' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} style={trStyle}>
              <td style={tdStyle}>{item.id}</td>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.email}</td>
              <td style={tdStyle}>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevious} disabled={page === 1} style={btnStyle}>
          Previous
        </button>
        <button style={{ ...btnStyle, fontWeight: 'bold' }}>{page}</button>
        <button onClick={handleNext} disabled={page === totalPages} style={btnStyle}>
          Next
        </button>
      </div>
    </div>
  );
};

const thStyle = { padding: '10px', border: '1px solid #ccc' };
const tdStyle = { padding: '10px', border: '1px solid #ccc' };
const trStyle = { backgroundColor: '#f9f9f9' };
const btnStyle = {
  margin: '0 10px',
  padding: '8px 16px',
  backgroundColor: '#008061',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default EmployeeTable;
