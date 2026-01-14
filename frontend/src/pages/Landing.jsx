import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-white flex items-center gap-2">
              <span>✓</span> Smart Wardrobe Platform
            </span>
            <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-white flex items-center gap-2">
              <span>✎</span> Rule-based outfits
            </span>
            <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-white">• No AI required</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
            Organize your<br/>
            wardrobe. Generate<br/>
            outfits. Look great<br/>
            every day.
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Upload your clothing, tag it with categories and colors, and get deterministic, context-aware outfits for any occasion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-lg font-medium hover:border-white/50 transition-colors text-center"
            >
              Explore features
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="py-8 text-center text-gray-400 text-sm">
        © 2026 ClosetOS. Built with modern, vibrant design.
      </footer>
    </div>
  );
};

export default Landing;