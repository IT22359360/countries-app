import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import './styles.css';
import CountryDetails from './components/CountryDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;