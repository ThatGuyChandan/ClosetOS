import React, { useState } from 'react';

const AddClothingItemForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    colors: '',
    season: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAddItem(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="colors"
          placeholder="Colors (comma separated)"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="season"
          placeholder="Season"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        {loading ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
};

export default AddClothingItemForm;
