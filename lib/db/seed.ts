import { db } from './index';
import { admins, technologies, projects, projectTechnologies, aboutContent, siteStats } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.insert(admins).values({
      username: 'admin',
      password: hashedPassword,
    });
    console.log('✅ Admin user created (username: admin, password: admin123)');

    // Insert technologies
    const techList = [
      { name: 'Next.js', slug: 'nextjs' },
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'Tailwind CSS', slug: 'tailwind' },
      { name: 'Three.js', slug: 'threejs' },
      { name: 'WebGL', slug: 'webgl' },
      { name: 'GSAP', slug: 'gsap' },
      { name: 'Stripe', slug: 'stripe' },
      { name: 'OpenAI', slug: 'openai' },
      { name: 'WebSocket', slug: 'websocket' },
      { name: 'GraphQL', slug: 'graphql' },
      { name: 'AWS', slug: 'aws' },
      { name: 'Redis', slug: 'redis' },
      { name: 'Chart.js', slug: 'chartjs' },
      { name: 'API Integration', slug: 'api-integration' },
      { name: 'Maps', slug: 'maps' },
      { name: 'HTML', slug: 'html' },
      { name: 'CSS', slug: 'css' },
      { name: 'Python', slug: 'python' },
      { name: 'Express.js', slug: 'expressjs' },
      { name: 'Vue.js', slug: 'vuejs' },
      { name: 'Angular', slug: 'angular' },
    ];

    const insertedTechs = await db.insert(technologies).values(techList).returning();
    console.log('✅ Technologies inserted');

    // Create a map of tech names to IDs
    const techMap = new Map(insertedTechs.map(tech => [tech.name, tech.id]));

    // Insert existing projects
    const projectsData = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
        imageUrl: '/placeholder-project.webp',
        demoUrl: '#',
        order: 1,
        techs: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe']
      },
      {
        title: '3D Portfolio Website',
        description: 'Interactive portfolio with stunning 3D animations using Three.js and React Three Fiber.',
        imageUrl: '/placeholder-project.webp',
        demoUrl: '#',
        order: 2,
        techs: ['React', 'Three.js', 'WebGL', 'GSAP']
      },
      {
        title: 'Task Management App',
        description: 'Real-time collaborative task management system with team features and notifications.',
        imageUrl: '/placeholder-project.webp',
        demoUrl: '#',
        order: 3,
        techs: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript']
      },
      {
        title: 'AI Chat Application',
        description: 'Modern chat application powered by AI with natural language processing capabilities.',
        imageUrl: '/placeholder-project.webp',
        demoUrl: '#',
        order: 4,
        techs: ['Next.js', 'OpenAI', 'WebSocket', 'MongoDB']
      },
      {
        title: 'Weather Dashboard',
        description: 'Beautiful weather forecast application with interactive maps and detailed analytics.',
        imageUrl: '/placeholder-project.webp',
        demoUrl: '#',
        order: 5,
        techs: ['React', 'API Integration', 'Chart.js', 'Maps']
      },
      {
        title: 'Social Media Platform',
        description: 'Feature-rich social networking platform with posts, stories, and real-time messaging.',
        imageUrl: '/placeholder-project.webp',
        demoUrl: '#',
        order: 6,
        techs: ['Next.js', 'GraphQL', 'AWS', 'Redis']
      }
    ];

    for (const projectData of projectsData) {
      const [insertedProject] = await db.insert(projects).values({
        title: projectData.title,
        description: projectData.description,
        imageUrl: projectData.imageUrl,
        demoUrl: projectData.demoUrl,
        order: projectData.order,
      }).returning();

      // Insert project technologies
      for (const techName of projectData.techs) {
        const techId = techMap.get(techName);
        if (techId) {
          await db.insert(projectTechnologies).values({
            projectId: insertedProject.id,
            technologyId: techId,
          });
        }
      }
    }
    console.log('✅ Projects inserted with technologies');

    // Insert about content
    await db.insert(aboutContent).values({
      title: 'About Me',
      subtitle: 'Full Stack Developer & Creative Coder',
      paragraphs: [
        "I'm a passionate developer with expertise in building modern web applications. I love turning complex problems into simple, beautiful, and intuitive designs.",
        "With a strong foundation in both frontend and backend technologies, I create seamless user experiences that are not only functional but also aesthetically pleasing.",
        "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or learning something new in the ever-evolving tech world."
      ],
    });
    console.log('✅ About content inserted');

    // Insert site statistics
    await db.insert(siteStats).values({
      yearsExperience: '5+',
      projectsCompleted: '50+',
    });
    console.log('✅ Site statistics inserted');

    console.log('🎉 Seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
