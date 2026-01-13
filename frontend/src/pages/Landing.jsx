import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-gray-800">ClosetOS</div>
        <nav>
          <Link to="/login" className="px-4 py-2 text-lg text-gray-600 hover:text-gray-800">Login</Link>
          <Link to="/register" className="px-4 py-2 ml-4 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600">Register</Link>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-5xl font-bold text-center text-gray-800">Welcome to ClosetOS</h1>
        <p className="mt-4 text-lg text-center text-gray-600">Your virtual closet manager</p>
        <div className="mt-8">
          <Link to="/register" className="px-8 py-3 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600">Get Started</Link>
        </div>
      </main>
    </div>
  );
};

export default Landing;