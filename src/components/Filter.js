const Filter = ({ onFilter }) => {
    const regions = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    return (
      <div className="w-full md:w-1/4">
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {regions.map(region => (
            <option key={region} value={region}>
              {region === 'all' ? 'Filter by Region' : region}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Filter;