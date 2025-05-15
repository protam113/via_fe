'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Define brush stroke types with varying properties
interface BrushStroke {
  id: number;
  path: string;
  color: string;
  width: number;
  delay: number;
  duration: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

// Premium color palette
const colors = [
  '#E27D60', // Terracotta
  '#85CDCA', // Teal
  '#E8A87C', // Peach
  '#C38D9E', // Mauve
  '#41B3A3', // Mint
  '#242038', // Dark Purple
  '#8D86C9', // Lavender
  '#F7ECE1', // Cream
];

// Brush stroke path variations - much longer paths
const brushPaths = [
  'M0,0 C100,50 200,-50 300,0 S400,50 500,0 S600,-50 700,0', // Long wavy
  'M0,0 Q150,-100 300,0 T600,0 T900,0', // Long S-curves
  'M0,0 C150,150 350,150 500,0 C650,-150 850,-150 1000,0', // Double arc
  'M0,0 Q250,150 500,0 Q750,-150 1000,0', // Long double curve
  'M0,0 C100,-100 400,100 500,0 C600,-100 900,100 1000,0', // Long swoosh
  'M0,0 Q100,-75 200,0 T400,0 T600,0 T800,0 T1000,0', // Multiple long curves
  'M0,0 L1000,0', // Long straight (for variety)
  'M0,0 Q150,-200 300,0 Q450,200 600,0 Q750,-200 900,0', // Triple deep wave
];

// Generate random brush strokes
const generateBrushStrokes = (count: number): BrushStroke[] => {
  return Array.from({ length: count }).map((_, index) => {
    const randomPath =
      brushPaths[Math.floor(Math.random() * brushPaths.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomWidth = Math.random() * 12 + 8; // 8-20px - slightly thicker

    // Longer animation duration for the drawing effect
    const randomDelay = Math.random() * 2; // 0-2s
    const randomDuration = Math.random() * 1.5 + 2; // 2-3.5s - longer duration

    // Position strokes to span across the screen
    // Instead of random points, position at edges with angles that cross the screen
    const startFromEdge = Math.floor(Math.random() * 4); // 0-3 for top, right, bottom, left
    let randomX = 0;
    let randomY = 0;
    let randomRotation = 0;

    switch (startFromEdge) {
      case 0: // Top edge
        randomX = Math.random() * 100;
        randomY = -10;
        randomRotation = Math.random() * 90 + 0; // 0-90 degrees
        break;
      case 1: // Right edge
        randomX = 110;
        randomY = Math.random() * 100;
        randomRotation = Math.random() * 90 + 90; // 90-180 degrees
        break;
      case 2: // Bottom edge
        randomX = Math.random() * 100;
        randomY = 110;
        randomRotation = Math.random() * 90 + 180; // 180-270 degrees
        break;
      case 3: // Left edge
        randomX = -10;
        randomY = Math.random() * 100;
        randomRotation = Math.random() * 90 + 270; // 270-360 degrees
        break;
    }

    // Scale to ensure strokes are long enough to cross the screen
    const randomScale = Math.random() * 0.5 + 1.5; // 1.5-2.0 - larger scale

    // Slightly varying opacity
    const randomOpacity = Math.random() * 0.3 + 0.7; // 0.7-1.0

    return {
      id: index,
      path: randomPath,
      color: randomColor,
      width: randomWidth,
      delay: randomDelay,
      duration: randomDuration,
      x: randomX,
      y: randomY,
      rotation: randomRotation,
      scale: randomScale,
      opacity: randomOpacity,
    };
  });
};

interface PremiumLoaderProps {
  onLoadingComplete?: () => void;
  duration?: number;
  logoSrc?: string;
  strokeCount?: number;
}

export default function PremiumLoader({
  onLoadingComplete,
  duration = 5000,
  logoSrc = '/logo.svg?height=200&width=150',
  strokeCount = 25,
}: PremiumLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [brushStrokes, setBrushStrokes] = useState<BrushStroke[]>([]);
  const logoControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate brush strokes on mount
  useEffect(() => {
    setBrushStrokes(generateBrushStrokes(strokeCount));

    // Animate logo
    logoControls.start({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 2.2,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
      },
    });

    // Complete loading after duration
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete, strokeCount, logoControls]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      {/* Brush strokes container */}
      <div className="absolute inset-0 w-full h-full">
        {brushStrokes.map((stroke) => (
          <div
            key={stroke.id}
            className="absolute"
            style={{
              left: `${stroke.x}%`,
              top: `${stroke.y}%`,
              transform: `rotate(${stroke.rotation}deg) scale(${stroke.scale})`,
              opacity: stroke.opacity,
              transformOrigin: '0 0', // Set origin to start of stroke
            }}
          >
            <svg
              width="1000"
              height="200"
              viewBox="0 0 1000 200"
              style={{ overflow: 'visible' }}
            >
              {/* Base stroke */}
              <motion.path
                d={stroke.path}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={stroke.width}
                stroke={stroke.color}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: stroke.opacity,
                }}
                transition={{
                  delay: stroke.delay,
                  duration: stroke.duration,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'url(#watercolor)' }}
              />

              {/* Texture overlay */}
              <motion.path
                d={stroke.path}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={stroke.width * 0.8}
                stroke={`${stroke.color}88`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 0.9,
                  opacity: stroke.opacity * 0.7,
                }}
                transition={{
                  delay: stroke.delay + 0.1,
                  duration: stroke.duration - 0.2,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'url(#brushTexture)' }}
              />

              {/* Highlight detail */}
              <motion.path
                d={stroke.path}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={stroke.width * 0.4}
                stroke={`${stroke.color}55`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 0.7,
                  opacity: stroke.opacity * 0.9,
                }}
                transition={{
                  delay: stroke.delay + 0.2,
                  duration: stroke.duration - 0.3,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'url(#highlight)' }}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Logo in center */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={logoControls}
      >
        <img
          src={logoSrc || '/placeholder.svg'}
          alt="Logo"
          className="w-32 h-32 object-contain"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        />
      </motion.div>

      {/* SVG Filters for organic brush texture */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Watercolor effect */}
          <filter id="watercolor" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>

          {/* Brush texture effect */}
          <filter
            id="brushTexture"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.05"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
            <feGaussianBlur stdDeviation="0.3" />
          </filter>

          {/* Highlight effect */}
          <filter id="highlight" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.08"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            <feGaussianBlur stdDeviation="0.2" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
