import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md">
      <div className="text-2xl font-bold text-indigo-600">
        <Link to="/">ClosetOS</Link>
      </div>
      <nav>
        {token ? (
          <>
            <Link to="/dashboard" className="px-4 py-2 text-lg text-gray-600 hover:text-gray-800">Dashboard</Link>
            <Link to="/wardrobe" className="px-4 py-2 text-lg text-gray-600 hover:text-gray-800">Wardrobe</Link>
            <Link to="/profile" className="px-4 py-2 text-lg text-gray-600 hover:text-gray-800">Profile</Link>
            <button onClick={handleLogout} className="px-4 py-2 ml-4 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-lg text-gray-600 hover:text-gray-800">Login</Link>
            <Link to="/register" className="px-4 py-2 ml-4 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
