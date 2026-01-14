import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWardrobeItems } from '../services/api';

const Dashboard = () => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await getWardrobeItems();
        setWardrobeItems(data);
      } catch (error) {
        console.error('Failed to fetch wardrobe items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const getStats = () => {
    const total = wardrobeItems.length;
    const tops = wardrobeItems.filter(item => item.category === 'Top').length;
    const bottoms = wardrobeItems.filter(item => item.category === 'Bottom').length;
    const accessories = wardrobeItems.filter(item => item.category === 'Accessory').length;
    const shoes = wardrobeItems.filter(item => item.category === 'Shoes').length;
    return { total, tops, bottoms, accessories, shoes };
  };

  const getRecentItems = () => {
    return [...wardrobeItems]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  };

  const getColorDistribution = () => {
    const colorCount = {};
    wardrobeItems.forEach(item => {
      item.colors.forEach(color => {
        colorCount[color.toLowerCase()] = (colorCount[color.toLowerCase()] || 0) + 1;
      });
    });
    const total = wardrobeItems.reduce((sum, item) => sum + item.colors.length, 0);
    const entries = Object.entries(colorCount)
      .map(([color, count]) => ({ color, percentage: (count / total) * 100 }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
    return entries;
  };

  const getSeasonalBalance = () => {
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    const seasonCount = {};
    seasons.forEach(season => {
      seasonCount[season] = wardrobeItems.filter(item => 
        item.season === season || item.season === 'All'
      ).length;
    });
    const max = Math.max(...Object.values(seasonCount), 1);
    return seasons.map(season => ({
      season,
      count: seasonCount[season],
      percentage: (seasonCount[season] / max) * 100
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const stats = getStats();
  const recentItems = getRecentItems();
  const colorDist = getColorDistribution();
  const seasonalBalance = getSeasonalBalance();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">Your wardrobe summary, recent items, and quick actions will appear here.</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total items</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Tops</div>
            <div className="text-3xl font-bold text-white">{stats.tops}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Bottoms</div>
            <div className="text-3xl font-bold text-white">{stats.bottoms}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Accessories</div>
            <div className="text-3xl font-bold text-white">{stats.accessories}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Shoes</div>
            <div className="text-3xl font-bold text-white">{stats.shoes}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Items */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recent items</h2>
              <button
                onClick={() => navigate('/wardrobe')}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Manage →
              </button>
            </div>
            <div className="space-y-4">
              {recentItems.length > 0 ? (
                recentItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2v-5zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-gray-400 text-sm">{item.category} • {formatDate(item.createdAt)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm">No items yet. Add some to your wardrobe!</div>
              )}
            </div>
          </div>

          {/* Color Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Color distribution</h2>
            <div className="space-y-3">
              {colorDist.length > 0 ? (
                colorDist.map((item, index) => (
                  <div key={item.color}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300 capitalize">{item.color}</span>
                      <span className="text-gray-400">{Math.round(item.percentage)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-purple-600"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm">No color data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Seasonal Balance */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Seasonal balance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seasonalBalance.map((item) => (
              <div key={item.season}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{item.season}</span>
                  <span className="text-gray-400">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/wardrobe')}
              className="flex items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 2L4 6v12h3v-6h7v6h3V6l-6.5-4z"/>
                </svg>
              </div>
              <span className="text-white font-medium">Add item</span>
            </button>
            <button
              onClick={() => navigate('/outfit-generator')}
              className="flex items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2v-5zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
              </div>
              <span className="text-white font-medium">Generate outfit</span>
            </button>
            <button
              onClick={() => navigate('/wardrobe')}
              className="flex items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-white font-medium">View insights</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;