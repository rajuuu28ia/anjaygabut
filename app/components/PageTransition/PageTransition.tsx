'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import wonderThingsAnimation from '@/app/animasi/Wonder Things.json';

interface PageTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function PageTransition({ isActive, onComplete }: PageTransitionProps) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (isActive) {
      setPhase('enter');
      
      const exitTimer = setTimeout(() => {
        setPhase('exit');
      }, 3000);
      
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3700);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ 
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' 
          }}
          animate={{ 
            clipPath: phase === 'exit'
              ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
              : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          }}
          transition={{ 
            duration: phase === 'exit' ? 0.7 : 0.5,
            ease: [0.76, 0, 0.24, 1]
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            zIndex: 9999
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: phase === 'exit' ? 1.2 : 1, 
                opacity: phase === 'exit' ? 0 : 1
              }}
              transition={{ 
                scale: { duration: 0.4, ease: "easeOut" },
                opacity: { duration: phase === 'exit' ? 0.3 : 0.5 }
              }}
              className="w-[70vw] h-[70vh] max-w-[500px] max-h-[500px] md:w-[60vw] md:h-[60vh] md:max-w-[600px] md:max-h-[600px]"
            >
              <Lottie 
                animationData={wonderThingsAnimation} 
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
