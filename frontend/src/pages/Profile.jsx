import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.getProfile(token);
        setUser(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Failed to fetch profile. Please try again.');
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {user && (
            <div className="mt-6">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
