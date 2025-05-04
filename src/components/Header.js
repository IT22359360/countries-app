import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            CE
          </div>
          <h1 className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Countries Explorer
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#home" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Home</a>
          <a href="#explore" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Explore</a>
          <a href="#about" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">About</a>
          <a href="#contact" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Contact</a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-800 font-medium">Welcome, {user.username}</span>
              <button 
                  onClick={logout}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
                to="/login" 
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-400 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <a href="#home" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Home</a>
            <a href="#explore" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Explore</a>
            <a href="#about" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">About</a>
            <a href="#contact" className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Contact</a>
            
            {user ? (
              <div className="flex flex-col space-y-2">
                <span className="text-gray-800 font-medium">Welcome, {user.username}</span>
                <button 
                  onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                  to="/login" 
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-400 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
)

};
  
export default Header;

