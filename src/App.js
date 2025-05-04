import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import './styles.css';
import CountryDetails from './components/CountryDetails';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Favorites from './components/Favorites';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
<Route path="/country/:code" element={
            <PrivateRoute>
              <CountryDetails />
            </PrivateRoute>
          } />
          
          <Route path="/favorites" element={
              <Favorites />
          } />        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;