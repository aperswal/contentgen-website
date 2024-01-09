import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Propagate the search term to the parent component
  };

  return (
    <Form.Control
      type="text"
      placeholder="Search files and folders"
      value={searchTerm}
      onChange={handleSearchChange}
      style={{ 
        borderTopRightRadius: '15px', 
        borderBottomRightRadius: '15px', 
        border: '1px solid #d3d3d3', // Dark gray border
        backgroundColor: '#f2f2f2 !important' 
      }}
    />
  );
}
