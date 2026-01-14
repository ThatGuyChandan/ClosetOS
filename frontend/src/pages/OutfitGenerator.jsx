import React, { useState } from 'react';
import API from '../services/api';

const OutfitGenerator = () => {
  const [occasion, setOccasion] = useState('casual');
  const [weather, setWeather] = useState('sunny');
  const [season, setSeason] = useState('Spring');
  const [generatedOutfit, setGeneratedOutfit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateOutfit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedOutfit([]);

    try {
      const { data } = await API.post('/outfits/generate', { occasion, weather, season });
      setGeneratedOutfit(data);
    } catch (err) {
      setError('Failed to generate outfit. Please make sure your wardrobe has items in the selected categories.');
      console.error('Outfit generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const weatherOptions = [
    { value: 'cold', label: 'Cold' },
    { value: 'mild', label: 'Mild' },
    { value: 'warm', label: 'Warm' },
    { value: 'sunny', label: 'Sunny' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Outfit Generator</h1>
        <p className="text-gray-400 mb-8">Create rule-based outfits from your wardrobe by occasion and weather.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 sticky top-4">
              <div className="mb-4">
                <button className="w-full px-4 py-2 bg-gray-700/50 text-white rounded-lg text-sm flex items-center justify-between">
                  <span>Rule-based generator</span>
                  <span className="text-xs">100%</span>
                </button>
              </div>

              <h2 className="text-xl font-bold text-white mb-4">Generate outfit</h2>
              <p className="text-gray-400 text-sm mb-6">Pick occasion, weather and season. This demo uses deterministic selections.</p>

              <form onSubmit={handleGenerateOutfit} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="sport">Sport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Weather</label>
                  <select
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {weatherOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Season</label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="All">All</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Generating...'
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.5 2L4 6v12h3v-6h7v6h3V6l-6.5-4z"/>
                      </svg>
                      Generate
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 min-h-[400px]">
              {error && (
                <div className="mb-4 p-4 bg-red-900/20 border border-red-600/50 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white">Generating outfit...</div>
                </div>
              ) : generatedOutfit.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Generated Outfit</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {generatedOutfit.map((item) => (
                      <div key={item.id} className="bg-gray-700/50 rounded-lg overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                          <div className="text-gray-400 text-sm">
                            {item.category} • {item.season}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <p className="mb-2">Choose inputs and generate to see a composed outfit.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitGenerator;
