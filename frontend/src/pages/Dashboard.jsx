import { useState, useEffect } from 'react';
import { Shirt, Layers, Box, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.getWardrobeItems(token);
        const items = response.data;

        // Calculate stats
        const totalItems = items.length;
        const tops = items.filter((item) => item.category === 'Top').length;
        const bottoms = items.filter((item) => item.category === 'Bottom').length;
        const accessories = items.filter((item) => item.category === 'Accessory').length;
        const shoes = items.filter((item) => item.category === 'Shoes').length;

        setStats([
          { label: 'Total items', value: totalItems },
          { label: 'Tops', value: tops },
          { label: 'Bottoms', value: bottoms },
          { label: 'Accessories', value: accessories },
          { label: 'Shoes', value: shoes },
        ]);

        // Get recent items
        const sortedItems = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentItems(sortedItems.slice(0, 3));
      } catch (err) {
        setError('Failed to fetch dashboard data.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-white/70">Your wardrobe summary and recent items.</p>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          <div className="mt-6 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4">
                  <div className="text-sm text-white/60">{s.label}</div>
                  <div className="mt-1 text-2xl font-semibold">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Recent items</h2>
                  <a href="/wardrobe" className="text-sm text-white/80 inline-flex items-center gap-1 hover:text-white">
                    Manage <ArrowRight className="h-4 w-4"/>
                  </a>
                </div>
                <ul className="mt-4 space-y-3">
                  {recentItems.map((r) => (
                    <li key={r.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-sky-500 to-emerald-400 grid place-items-center">
                          <Layers className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{r.name}</div>
                          <div className="text-xs text-white/60">{r.category}</div>
                        </div>
                      </div>
                      <div className="text-xs text-white/60">{new Date(r.createdAt).toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
                <h2 className="text-lg font-semibold">Quick actions</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href="/wardrobe" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90">
                    <Shirt className="h-4 w-4"/> Add item
                  </a>
                  <a href="/outfits" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20">
                    <Box className="h-4 w-4"/> Generate outfit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}