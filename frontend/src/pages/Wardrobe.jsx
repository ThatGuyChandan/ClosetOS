import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AddClothingItemForm from '../components/AddClothingItemForm';

const Wardrobe = () => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWardrobeItems = async () => {
    try {
      const { data } = await API.get('/wardrobe');
      setWardrobeItems(data);
    } catch (error) {
      console.error('Failed to fetch wardrobe items', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWardrobeItems();
  }, []);

  const handleAddItem = async (formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('colors', formData.colors);
    data.append('season', formData.season);
    data.append('image', formData.image);

    try {
      await API.post('/wardrobe', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchWardrobeItems();
    } catch (error) {
      console.error('Failed to add item', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await API.delete(`/wardrobe/${id}`);
        fetchWardrobeItems();
      } catch (error) {
        console.error('Failed to delete item', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Wardrobe</h1>
        <p className="text-gray-400 mb-8">Upload clothing with image, category, colors and season. Manage items in a clean grid.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Add Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Add clothing</h2>
              <AddClothingItemForm onAddItem={handleAddItem} />
            </div>
          </div>

          {/* Right Panel - Grid */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Your items</h2>
              {wardrobeItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No items yet. Add some to your wardrobe!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wardrobeItems.map((item) => (
                    <div key={item.id} className="bg-gray-700/50 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                      <div className="relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="absolute top-2 right-2 p-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white transition-colors"
                          title="Delete item"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                        <div className="text-gray-400 text-sm mb-3">
                          {item.category} • {item.season}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.colors.map((color, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-600/50 text-white text-xs rounded"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
