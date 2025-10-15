'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PageTransition from '../PageTransition/PageTransition';

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetHref, setTargetHref] = useState('');
  const router = useRouter();

  const handleNavClick = (sectionId: string) => {
    setTargetHref(`#${sectionId}`);
    setIsTransitioning(true);
    setIsOpen(false);
  };

  const handleLoveClick = () => {
    setIsTransitioning(true);
    setIsOpen(false);
    setTimeout(() => {
      router.push('/love');
    }, 500);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);

    if (targetHref) {
      const targetId = targetHref.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setTargetHref('');
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      setIsOpen(true);
    } else if (info.offset.x < -50) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar Content - Slides in/out */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 16 : -264
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }}
        drag="x"
        dragConstraints={{ left: -264, right: 16 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        className="fixed left-0 top-24 z-50 md:hidden bg-black/40 backdrop-blur-xl rounded-r-[2.5rem] p-6 shadow-2xl border-r border-t border-b border-white/10 w-64"
      >
        <div className="flex flex-col gap-6">
          {/* Home Icon */}
          <button
            onClick={() => handleNavClick('home')}
            className="group relative w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="Home"
          >
            <svg
              className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-px bg-white/10"></div>

          {/* Profile/About Icon */}
          <button
            onClick={() => handleNavClick('about')}
            className="group relative w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="About"
          >
            <svg
              className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-px bg-white/10"></div>

          {/* Projects Icon */}
          <button
            onClick={() => handleNavClick('projects')}
            className="group relative w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="Projects"
          >
            <svg
              className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-px bg-white/10"></div>

          {/* Skills Icon */}
          <button
            onClick={() => handleNavClick('skills')}
            className="group relative w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="Skills"
          >
            <svg
              className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-px bg-white/10"></div>

          {/* Contact Icon */}
          <button
            onClick={() => handleNavClick('contact')}
            className="group relative w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="Contact"
          >
            <svg
              className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-px bg-white/10"></div>

          {/* Love Icon */}
          <button
            onClick={handleLoveClick}
            className="group relative w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="Love"
          >
            <svg
              className="w-7 h-7 text-gray-300 group-hover:text-red-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Toggle Tab/Handle - Follows sidebar position */}
      <motion.button
        initial={false}
        animate={{
          left: isOpen ? 280 : 0
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 z-50 md:hidden bg-white/90 backdrop-blur-xl rounded-r-[1.5rem] p-3 px-2 shadow-2xl border-r border-t border-b border-gray-300 hover:bg-white transition-all duration-300 active:scale-95"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div className="flex flex-col items-center gap-2">
          {/* Slide Indicator - Animated Chevron */}
          <motion.svg
            animate={{
              x: isOpen ? 0 : [0, 5, 0],
              rotate: isOpen ? 180 : 0
            }}
            transition={{
              x: {
                repeat: isOpen ? 0 : Infinity,
                duration: 1.5,
                ease: "easeInOut"
              },
              rotate: {
                duration: 0.3
              }
            }}
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>

          {/* Dots Indicator */}
          <div className="flex flex-col gap-1">
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </motion.button>

      {/* Overlay when open */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Page Transition */}
      <PageTransition isActive={isTransitioning} onComplete={handleTransitionComplete} />
    </>
  );
}