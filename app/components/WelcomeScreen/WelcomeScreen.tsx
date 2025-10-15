
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import animationData from '@/app/animasi/2fd11cea-7c85-4e0c-98fa-499492d4d882.json';

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Hide initial splash screen
    const splashElement = document.getElementById('initial-splash');
    if (splashElement) {
      splashElement.style.display = 'none';
    }
    
    setIsReady(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Disable scrolling when welcome screen is visible
  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black w-screen h-screen overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            exit={{ 
              scale: 1.1, 
              opacity: 0,
              transition: { duration: 0.4, ease: "easeIn" }
            }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="w-64 h-64 md:w-80 md:h-80">
              <Lottie 
                animationData={animationData} 
                loop={true}
                autoplay={true}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.2, duration: 0.3 }
              }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                Loading your experience...
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: 1,
                transition: { duration: 7.5, ease: "easeInOut" }
              }}
              className="w-48 h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full origin-left"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
