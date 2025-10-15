'use client';

import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';

interface SiteStats {
  id: number;
  yearsExperience: string;
  projectsCompleted: string;
}

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    yearsExperience: '',
    projectsCompleted: '',
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      if (response.ok && data) {
        setFormData({
          yearsExperience: data.yearsExperience,
          projectsCompleted: data.projectsCompleted,
        });
      }
    } catch (error) {
      console.error('Load stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/stats', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Statistics berhasil diupdate!');
      } else {
        const data = await response.json();
        alert(data.error || 'Gagal menyimpan');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Statistics</h1>
        <p className="text-gray-400">
          Update angka statistik di section About Me
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Years Experience
              </label>
              <input
                type="text"
                value={formData.yearsExperience}
                onChange={(e) =>
                  setFormData({ ...formData, yearsExperience: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                placeholder="Contoh: 5+"
              />
              <p className="text-gray-500 text-sm mt-2">
                Angka pengalaman kerja (boleh pakai format seperti: 5+, 10+, dst.)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Projects Completed
              </label>
              <input
                type="text"
                value={formData.projectsCompleted}
                onChange={(e) =>
                  setFormData({ ...formData, projectsCompleted: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                placeholder="Contoh: 50+"
              />
              <p className="text-gray-500 text-sm mt-2">
                Jumlah project yang sudah diselesaikan
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center space-x-2 bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <FiSave />
              <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </form>
        </div>

        {/* Preview */}
        <div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 sticky top-8">
            <h2 className="text-sm font-medium text-gray-400 mb-6">Preview</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900/20 p-8 rounded-lg border border-gray-800/30">
                <div className="text-5xl font-bold text-gray-400 mb-3">
                  {formData.yearsExperience}
                </div>
                <div className="text-lg text-gray-400">Years Experience</div>
              </div>
              <div className="bg-gray-900/20 p-8 rounded-lg border border-gray-800/30">
                <div className="text-5xl font-bold text-gray-400 mb-3">
                  {formData.projectsCompleted}
                </div>
                <div className="text-lg text-gray-400">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
