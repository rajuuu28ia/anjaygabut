'use client';

import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';

interface AboutContent {
  id: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    paragraphs: ['', '', ''],
  });

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      if (response.ok && data) {
        setFormData({
          title: data.title,
          subtitle: data.subtitle,
          paragraphs: data.paragraphs,
        });
      }
    } catch (error) {
      console.error('Load about error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = value;
    setFormData({ ...formData, paragraphs: newParagraphs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/about', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('About Me berhasil diupdate!');
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
        <h1 className="text-3xl font-bold text-white mb-2">Edit About Me</h1>
        <p className="text-gray-400">
          Update konten About Me di website utama
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                placeholder="Contoh: About Me"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                placeholder="Contoh: Full Stack Developer & Creative Coder"
              />
            </div>

            {formData.paragraphs.map((paragraph, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Paragraf {index + 1}
                </label>
                <textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                  placeholder={`Paragraf ${index + 1}...`}
                />
              </div>
            ))}

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
            <h2 className="text-sm font-medium text-gray-400 mb-4">Preview</h2>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white">{formData.title}</h3>
              <h4 className="text-xl font-semibold text-white">
                {formData.subtitle}
              </h4>
              {formData.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
