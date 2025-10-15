'use client';
import SkillsMarquee from '../SkillsMarquee/SkillsMarquee';

export default function Skills() {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'HTML/CSS']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'REST API']
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code', 'Linux']
    }
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
      <div className="max-w-[1920px] mx-auto w-full">
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 lg:mb-5">
            Skills & Technologies
          </h2>
          <div className="w-24 sm:w-32 lg:w-40 h-1 lg:h-2 bg-gray-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.category}
              className="bg-gray-900/10 backdrop-blur-sm p-8 sm:p-10 lg:p-12 rounded-xl border border-gray-800/30 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-400 mb-6 sm:mb-8">
                {skillGroup.category}
              </h3>
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                {skillGroup.items.map((skill, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 bg-gray-500 rounded-full mr-4 lg:mr-5"></div>
                    <span className="text-lg sm:text-xl lg:text-2xl text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 text-center">
          <SkillsMarquee />
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mt-8">
            Always learning and exploring new technologies to stay at the cutting edge of web development.
          </p>
        </div>
      </div>
    </section>
  );
}
