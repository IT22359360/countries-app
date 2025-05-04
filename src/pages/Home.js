import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';

const Home = () => {
  // State management
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('all');
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate || (() => {});

  // Fetch countries data from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter countries based on search and region
  useEffect(() => {
    let filtered = countries;
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (region !== 'all') {
      filtered = filtered.filter(country => country.region === region);
    }
    
    setFilteredCountries(filtered);
  }, [searchTerm, region, countries]);

  // Handler functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  
 

  // Hero Section
  const HeroSection = () => (
    <section id="home" className="pt-32 pb-16 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                Discover the World
              </span>
              <br /> One Country at a Time
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Explore comprehensive information about countries around the globe. 
              From population data to currencies, find everything you need to know.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#explore" 
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-400 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Explore Countries
              </a>
              <a 
                href="#about" 
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-full blur-xl opacity-20 transform -rotate-6"></div>
              <img 
                src="/api/placeholder/600/400" 
                alt="World Map" 
                className="relative z-10 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  

  // Explore Section
  const ExploreSection = () => (
    <section id="explore" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Explore Countries
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our comprehensive database of countries. 
            Use the search and filter options to find specific countries.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="md:w-1/3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for a country..." 
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              <svg 
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="md:w-1/4">
            <select 
              value={region}
              onChange={handleRegionChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option value="all">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">🔍</div>
            <p className="text-gray-600">No countries found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCountries.slice(0, 12).map(country => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
        
        {filteredCountries.length > 12 && (
          <div className="text-center mt-12">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Load More Countries
            </button>
          </div>
        )}
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Amazing Features
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover everything our platform has to offer to enhance your knowledge about countries worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Comprehensive Data</h3>
            <p className="text-gray-600">
              Access detailed information about every country including population, languages, currencies, and more.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Interactive Maps</h3>
            <p className="text-gray-600">
              Explore countries through interactive maps and visualize geographical information easily.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Favorites System</h3>
            <p className="text-gray-600">
              Save your favorite countries for quick access and create your personalized collection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                CE
              </div>
              <h3 className="ml-3 text-xl font-bold">Countries Explorer</h3>
            </div>
            <p className="text-gray-400">
              Explore the world's countries with detailed information and beautiful visuals.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#explore" className="text-gray-400 hover:text-white transition-colors">Explore</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-400">
              Subscribe to our newsletter
            </p>
            <div className="mt-2 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-400 text-white rounded-r-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Countries Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ExploreSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;