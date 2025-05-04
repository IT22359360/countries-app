import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const [countryRes, bordersRes] = await Promise.all([
          fetch(`https://restcountries.com/v3.1/alpha/${code}`),
          country?.borders ? 
            fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`) 
            : Promise.resolve(null)
        ]);

        if (!countryRes.ok) throw new Error('Country not found');
        const [countryData] = await countryRes.json();
        setCountry(countryData);

        if (bordersRes) {
          const bordersData = await bordersRes.json();
          setBorderCountries(bordersData);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [code]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Error Loading Country</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  if (!country) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-md">
        <div className="text-gray-400 text-5xl mb-4">🌍</div>
        <h2 className="text-2xl font-bold mb-2">Country Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find information for this country</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Countries
        </button>
      </div>
    </div>
  );

  const formatList = (obj) => {
    if (!obj) return 'N/A';
    return Object.values(obj).map(item => item.name || item).join(', ');
  };

  const formatCurrency = (currencies) => {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol || ''})`)
      .join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 mb-12 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-600" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Back to Countries</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Flag Image */}
            <div className="md:w-1/2 lg:w-2/5 p-8 md:p-12 flex items-center justify-center bg-gray-100">
              <img
                src={country.flags.svg || country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-auto max-h-96 object-contain shadow-lg"
              />
            </div>

            {/* Country Details */}
            <div className="md:w-1/2 lg:w-3/5 p-8 md:p-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{country.name.common}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Official Name:</span> {country.name.official}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Region:</span> {country.region}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Subregion:</span> {country.subregion || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Capital:</span> {country.capital?.join(', ') || 'N/A'}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Top Level Domain:</span> {country.tld?.join(', ') || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Currencies:</span> {formatCurrency(country.currencies)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Languages:</span> {formatList(country.languages)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Timezone(s):</span> {country.timezones?.join(', ') || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Driving Side:</span> {country.car?.side ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1) : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Border Countries */}
              {borderCountries.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Neighboring Countries</h3>
                  <div className="flex flex-wrap gap-3">
                    {borderCountries.map(border => (
                      <Link
                        key={border.cca3}
                        to={`/country/${border.cca3}`}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <img 
                          src={border.flags.svg} 
                          alt={`${border.name.common} flag`} 
                          className="w-5 h-3 object-cover"
                        />
                        <span>{border.name.common}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorite Button for logged in users */}
              {user && (
                <button className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Map Link */}
        {country.latlng && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Location</h3>
            <a
              href={`https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              View on Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;