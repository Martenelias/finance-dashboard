import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import Budgets from './pages/Budgets';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';

const API_URL = 'https://pennywise-api-sb4s.onrender.com';

const App = () => {
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.role === 'admin');
      } catch (error) {
        console.error('Token error:', error);
        setIsAdmin(false);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAdmin(false);
  };

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route
            path='/' element={<Login setToken={setToken} apiUrl={API_URL} />}
          />
          <Route
            path='/signup' element={<Register apiUrl={API_URL}/>}
          />
          <Route
            path='*' element={<Navigate to='/' />}
          />
        </Routes>
      ) : (
        <div className='flex h-screen bg-background-700'>
          <Nav handleLogout={handleLogout} />
          <Routes>
            <Route
              path='/dashboard'
              element={<Dashboard/>}
            />
            <Route
              path='/budgets'
              element={<Budgets/>}
            />
            <Route
              path='/incomes'
              element={<Incomes/>}
            />
            <Route
              path='/expenses'
              element={<Expenses/>}
            />
            <Route
              path='/reports'
              element={<Reports/>}
            />
            <Route path='*' element={<Navigate to='/dashboard' />} />
          </Routes>
        </div>
      )}
    </Router>
  )
};

export default App;
