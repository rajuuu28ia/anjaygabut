'use client';

import { useState, useEffect } from 'react';

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

export default function Projects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [selectedCategory, allProjects]);

  const loadData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/categories'),
      ]);
      
      const projectsData = await projectsRes.json();
      const categoriesData = await categoriesRes.json();
      
      setAllProjects(projectsData);
      setCategories(categoriesData);
      setFilteredProjects(projectsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    if (selectedCategory === null) {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(
        allProjects.filter((project) => project.categoryId === selectedCategory)
      );
    }
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
      <div className="max-w-[1920px] mx-auto w-full">
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 lg:mb-5">
            Featured Projects
          </h2>
          <div className="w-24 sm:w-32 lg:w-40 h-1 lg:h-2 bg-gray-600 mx-auto mb-8 lg:mb-10"></div>
          
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-white text-black'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                Semua Project
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-white text-black'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 text-xl">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto mb-6 w-32 h-32 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Oops, Belum ada project nih
            </h3>
            <p className="text-gray-400 text-lg sm:text-xl">
              Tunggu update selanjutnya ya!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-900/10 backdrop-blur-sm rounded-xl border border-gray-800/30 overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="h-56 lg:h-64 bg-gradient-to-br from-gray-600/20 to-gray-500/20 overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl sm:text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300">
                        💻
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech.id}
                        className="px-4 py-2 bg-gray-800/30 text-gray-300 rounded-full text-sm sm:text-base lg:text-lg"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-400 hover:text-gray-300 transition-colors text-base sm:text-lg lg:text-xl font-medium"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
