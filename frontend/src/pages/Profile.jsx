import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-red-400">Failed to load profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Profile</h1>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
              <div className="text-white text-lg">{user.name}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
              <div className="text-white text-lg">{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
