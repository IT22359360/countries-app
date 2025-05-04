import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (e) => {
      setSearchTerm(e.target.value);
      onSearch(e.target.value);
    };
  
    return (
      <div className="w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    );
  };
  
  export default Search;