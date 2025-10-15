'use client';

import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiThreedotjs, 
  SiHtml5, 
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFigma,
  SiLinux
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';

export default function SkillsMarquee() {
  const skills = [
    // Frontend
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#FFFFFF' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: SiThreedotjs, name: 'Three.js', color: '#FFFFFF' },
    { icon: SiHtml5, name: 'HTML/CSS', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    // Backend
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiExpress, name: 'Express', color: '#FFFFFF' },
    { icon: SiPython, name: 'Python', color: '#3776AB' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: TbApi, name: 'REST API', color: '#00D9FF' },
    // Tools & Others
    { icon: SiGit, name: 'Git', color: '#F05032' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: FaAws, name: 'AWS', color: '#FF9900' },
    { icon: SiFigma, name: 'Figma', color: '#F24E1E' },
    { icon: VscCode, name: 'VS Code', color: '#007ACC' },
    { icon: SiLinux, name: 'Linux', color: '#FCC624' }
  ];

  // Duplicate the skills array for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Marquee container - seamless infinite scroll */}
        <div className="flex animate-marquee-infinite">
          {duplicatedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-6 sm:mx-8 lg:mx-12 flex-shrink-0 group"
            >
              <div className="relative">
                <skill.icon
                  className="text-4xl sm:text-5xl lg:text-6xl transition-all duration-300 group-hover:scale-110"
                  style={{ color: skill.color }}
                />
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  style={{ backgroundColor: skill.color }}
                ></div>
              </div>
              <span className="mt-3 text-xs sm:text-sm text-gray-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
