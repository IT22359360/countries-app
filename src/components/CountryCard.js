import { Link, useNavigate } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="h-48 overflow-hidden">
      <img 
        src={country.flags.png || country.flags.svg} 
        alt={`Flag of ${country.name.common}`} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="font-bold text-xl mb-3 text-gray-800">{country.name.common}</h3>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
        </p>
      </div>
      <div className="mt-5">
        <button 
          onClick={() => navigate(`/country/${country.cca3}`)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-400 text-white rounded-lg text-sm hover:shadow-md transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  </div>

  );
};

export default CountryCard;