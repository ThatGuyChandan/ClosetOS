import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getProfile } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    const checkToken = () => setToken(localStorage.getItem('token'));
    const interval = setInterval(checkToken, 100);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await getProfile();
          setUser(data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-transparent">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.5 2L4 6v12h3v-6h7v6h3V6l-6.5-4z"/>
          </svg>
        </div>
        <span className="text-2xl font-bold text-white">ClosetOS</span>
      </Link>
      <nav className="flex items-center gap-6">
        {token ? (
          <>
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 text-white hover:opacity-80 transition-opacity ${isActive('/dashboard') ? 'underline' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/wardrobe" 
              className={`px-3 py-2 text-white hover:opacity-80 transition-opacity ${isActive('/wardrobe') ? 'underline' : ''}`}
            >
              Wardrobe
            </Link>
            <Link 
              to="/outfit-generator" 
              className={`px-3 py-2 text-white hover:opacity-80 transition-opacity ${isActive('/outfit-generator') ? 'underline' : ''}`}
            >
              Outfits
            </Link>
            {user && (
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-2 text-white hover:opacity-80 transition-opacity ${isActive('/profile') ? 'underline' : ''}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="hidden sm:inline text-sm">
                  Hey, {user.name?.split(' ')[0] || 'User'}
                </span>
              </Link>
            )}
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="px-3 py-2 text-white hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              <span>→</span> Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-white bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1"
            >
              <span>+</span> Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
