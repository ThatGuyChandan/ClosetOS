import { useState } from 'react';
import { Box, Wand2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Outfits() {
  const [occasion, setOccasion] = useState('casual');
  const [outfit, setOutfit] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateOutfit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.generateOutfit(occasion, token);
      setOutfit(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Failed to generate outfit. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <h1 className="text-2xl font-bold">Outfit Generator</h1>
          <p className="mt-2 text-white/70">Create rule-based outfits from your wardrobe by occasion.</p>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 text-xs text-white/80">
                <Wand2 className="h-3 w-3"/> Rule-based generator
              </div>
              <h2 className="mt-3 text-lg font-semibold">Generate outfit</h2>
              <p className="mt-1 text-sm text-white/70">Pick an occasion.</p>
              {error && <p className="mt-4 text-red-500">{error}</p>}
              <form className="mt-4 space-y-4" onSubmit={handleGenerateOutfit}>
                <div>
                  <label className="block text-sm text-white/80">Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white"
                  >
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90">
                  <Box className="h-4 w-4"/> Generate
                </button>
              </form>
            </div>
            <div className="lg:col-span-2">
              {!outfit ? (
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 text-center">
                  <p className="text-white/70">Choose an occasion and generate to see a composed outfit.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outfit.map((item) => (
                      <div key={item.id} className="rounded-xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur">
                        <div className="aspect-video bg-slate-900/50">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-white/60">{item.category}</div>
                          <div className="mt-1 font-semibold">{item.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}