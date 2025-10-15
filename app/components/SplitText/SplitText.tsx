'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    if (splitType === 'chars') {
      setChars(text.split(''));
    } else if (splitType === 'words') {
      setChars(text.split(' '));
    }
  }, [text, splitType]);

  useGSAP(
    () => {
      if (!containerRef.current || chars.length === 0) return;

      const elements = containerRef.current.querySelectorAll('.split-char');
      
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
      });
      
      tl.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            onLetterAnimationComplete?.();
          },
        }
      );
    },
    {
      dependencies: [chars, delay, duration, ease, JSON.stringify(from), JSON.stringify(to)],
      scope: containerRef,
    }
  );

  const renderContent = () => {
    return (
      <div 
        ref={containerRef} 
        className={`inline-block ${className}`}
        style={{ textAlign }}
      >
        {chars.map((char, index) => (
          <span
            key={index}
            className="split-char inline-block"
            style={{ 
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    );
  };

  switch (tag) {
    case 'h1':
      return <h1>{renderContent()}</h1>;
    case 'h2':
      return <h2>{renderContent()}</h2>;
    case 'h3':
      return <h3>{renderContent()}</h3>;
    case 'h4':
      return <h4>{renderContent()}</h4>;
    case 'h5':
      return <h5>{renderContent()}</h5>;
    case 'h6':
      return <h6>{renderContent()}</h6>;
    case 'span':
      return <span>{renderContent()}</span>;
    default:
      return <p>{renderContent()}</p>;
  }
};

export default SplitText;
