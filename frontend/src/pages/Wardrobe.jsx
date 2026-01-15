import { useState, useEffect } from 'react';
import { Trash2, UploadCloud, Tag, Palette, CalendarRange } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Wardrobe() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Top');
  const [colors, setColors] = useState('');
  const [season, setSeason] = useState('All');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.getWardrobeItems(token);
        setItems(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Failed to fetch wardrobe items. Please try again.');
        }
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('colors', colors);
      formData.append('season', season);
      formData.append('image', image);

      const response = await api.addWardrobeItem(formData, token);
      setItems([...items, response.data]);
      setName('');
      setCategory('Top');
      setColors('');
      setSeason('All');
      setImage(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add item. Please try again.');
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.deleteWardrobeItem(id, token);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Failed to delete item. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <h1 className="text-2xl font-bold">Wardrobe</h1>
          <p className="mt-2 text-white/70">Upload clothing with image, category, colors and season. Manage items in a clean grid.</p>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <h2 className="text-lg font-semibold">Add clothing</h2>
              {error && <p className="mt-4 text-red-500">{error}</p>}
              <form className="mt-4 space-y-4" onSubmit={handleAddItem}>
                <div>
                  <label className="block text-sm text-white/80">Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-white/40"
                    placeholder="e.g., Navy Chinos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 flex items-center gap-2"><Tag className="h-4 w-4"/> Category</label>
                  <select
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Top</option>
                    <option>Bottom</option>
                    <option>Shoes</option>
                    <option>Outerwear</option>
                    <option>Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/80 flex items-center gap-2"><Palette className="h-4 w-4"/> Colors</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-white/40"
                    placeholder="comma-separated (e.g., navy, white)"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 flex items-center gap-2"><CalendarRange className="h-4 w-4"/> Season</label>
                  <select
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                  >
                    <option>All</option>
                    <option>Spring</option>
                    <option>Summer</option>
                    <option>Fall</option>
                    <option>Winter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/80">Image</label>
                  <input
                    type="file"
                    className="mt-1 w-full text-white"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90">
                  <UploadCloud className="h-4 w-4"/> Add Item
                </button>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your items</h2>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur">
                    <div className="aspect-video bg-slate-900/50">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-white/70">{item.category} • {item.season}</p>
                        </div>
                        <button
                          className="p-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15"
                          title="Delete"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-white/80" />
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.colors.map((c) => (
                          <span key={c} className="px-2 py-1 text-xs rounded-full bg-white/10 border border-white/10 text-white/80">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}