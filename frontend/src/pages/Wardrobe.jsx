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
    try {
      await API.delete(`/wardrobe/${id}`);
      fetchWardrobeItems();
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">My Wardrobe</h1>
      <AddClothingItemForm onAddItem={handleAddItem} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wardrobeItems.map((item) => (
          <div key={item.id} className="border rounded-md shadow-md">
            <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Colors:</strong> {item.colors.join(', ')}</p>
              <p><strong>Season:</strong> {item.season}</p>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="mt-4 w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;
