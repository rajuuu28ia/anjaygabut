'use client';

import Navbar from "@/app/components/Navbar/Navbar";
import MobileSidebar from "@/app/components/MobileSidebar/MobileSidebar";
import About from "@/app/components/About/About";
import Skills from "@/app/components/Skills/Skills";
import Projects from "@/app/components/Projects/Projects";
import Contact from "@/app/components/Contact/Contact";
import WelcomeScreen from "@/app/components/WelcomeScreen/WelcomeScreen";
import SplitText from "@/app/components/SplitText/SplitText";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/background/file_00000000679c61fa9e5f04ed2dd6208d.png)',
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Overlay untuk readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <WelcomeScreen />
      {/* Navigation */}
      <Navbar />

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <div className="relative z-10" style={{ position: 'relative' }}>
        {/* Hero Section with Lanyard */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pt-24 lg:pt-32">
          <div className="max-w-[1920px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl mb-2 lg:mb-3 animate-fade-in">
                  Hi, I'm
                </p>
                <div className="lg:text-left text-center">
                  <SplitText
                    text="Muhammad Hafidz Fikriansyah"
                    tag="h1"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
                    delay={80}
                    duration={1.2}
                    ease="elastic.out(1, 0.3)"
                    splitType="chars"
                    from={{ opacity: 0, y: 40, scale: 0.5 }}
                    to={{ opacity: 1, y: 0, scale: 1 }}
                    threshold={0}
                    rootMargin="0px"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 mb-4 sm:mb-5 animate-fade-in-up">
                  Full Stack Developer
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-7 lg:mb-8 max-w-3xl mx-auto lg:mx-0 animate-fade-in-up">
                  Passionate about creating beautiful, functional, and user-friendly web experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in-up">
                  <button
                    onClick={() => {
                      const element = document.getElementById('projects');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-base sm:text-lg lg:text-xl font-medium hover:scale-105"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 border-2 border-gray-600 text-gray-400 rounded-lg hover:bg-gray-600/10 transition-all duration-300 text-base sm:text-lg lg:text-xl font-medium hover:scale-105"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}
