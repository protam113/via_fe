'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const logoControls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 0);
          return 100;
        }
        return prev + 2.5;
      });
    }, 100);

    logoControls.start({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 2.2,
        ease: [0.34, 1.56, 0.64, 1],
      },
    });

    return () => clearInterval(interval);
  }, [logoControls, onLoadingComplete]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/vid/drop_loading.mp4" type="video/mp4" />
      </video>

      {/* Logo in the center */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={logoControls}
      >
        <img
          src="/icons/logo_noBg.svg?height=200&width=150"
          alt="Logo"
          width={350}
          height={350}
          className="object-contain"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        />
      </motion.div>

      {/* Loading progress indicator */}
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-64">
        <div className="h-2 w-full rounded-full bg-white/50">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
