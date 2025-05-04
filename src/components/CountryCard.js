import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{country.name.common}</h3>
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
      </div>
    </Link>
  );
};

export default CountryCard;