'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface Technology {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  categoryId: number | null;
  category: Category | null;
  technologies: Technology[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    demoUrl: '',
    categoryId: null as number | null,
    technologyIds: [] as number[],
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<Technology[]>([]);

  useEffect(() => {
    loadProjects();
    loadTechnologies();
    loadCategories();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Load projects error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTechnologies = async () => {
    try {
      const response = await fetch('/api/technologies');
      const data = await response.json();
      setTechnologies(data);
    } catch (error) {
      console.error('Load technologies error:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Load categories error:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      } else {
        alert(data.error || 'Upload gagal');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat upload');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTechToggle = (tech: Technology) => {
    const isSelected = selectedTechs.some((t) => t.id === tech.id);
    if (isSelected) {
      setSelectedTechs(selectedTechs.filter((t) => t.id !== tech.id));
      setFormData((prev) => ({
        ...prev,
        technologyIds: prev.technologyIds.filter((id) => id !== tech.id),
      }));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
      setFormData((prev) => ({
        ...prev,
        technologyIds: [...prev.technologyIds, tech.id],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.imageUrl || !formData.demoUrl) {
      alert('Semua field harus diisi');
      return;
    }

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : '/api/projects';
      const method = editingProject ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadProjects();
        handleCloseModal();
      } else {
        const data = await response.json();
        alert(data.error || 'Gagal menyimpan project');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadProjects();
      } else {
        alert('Gagal menghapus project');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      demoUrl: project.demoUrl,
      categoryId: project.categoryId,
      technologyIds: project.technologies.map((t) => t.id),
    });
    setSelectedTechs(project.technologies);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      demoUrl: '',
      categoryId: null,
      technologyIds: [],
    });
    setSelectedTechs([]);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FiPlus />
          <span>Tambah Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
          >
            <div className="h-48 bg-gray-800">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                {project.category && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                    {project.category.name}
                  </span>
                )}
              </div>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FiEdit2 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <FiTrash2 size={16} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Tambah Project Baru'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Gambar Project
                  <span className="text-gray-500 text-xs ml-2">
                    (Disarankan: WebP, 16:9, max 5MB)
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                />
                {uploadingImage && (
                  <p className="text-gray-400 text-sm mt-2">Uploading...</p>
                )}
                {formData.imageUrl && (
                  <div className="mt-4">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nama Project
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                  placeholder="Contoh: Website Coffee"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kategori Project
                </label>
                <select
                  value={formData.categoryId || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value ? parseInt(e.target.value) : null })
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                >
                  <option value="">Pilih kategori...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deskripsi Project
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                  placeholder="Jelaskan tentang project ini..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teknologi yang Dipakai
                </label>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {technologies.map((tech) => (
                      <button
                        key={tech.id}
                        type="button"
                        onClick={() => handleTechToggle(tech)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedTechs.some((t) => t.id === tech.id)
                            ? 'bg-white text-black'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedTechs.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedTechs.map((tech) => (
                      <span
                        key={tech.id}
                        className="flex items-center space-x-1 px-3 py-1 bg-white text-black rounded-full text-sm"
                      >
                        <span>{tech.name}</span>
                        <button
                          type="button"
                          onClick={() => handleTechToggle(tech)}
                          className="hover:text-gray-600"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Demo Link */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link Demo
                </label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, demoUrl: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                  placeholder="https://example.com"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {editingProject ? 'Simpan Perubahan' : 'Tambah Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
