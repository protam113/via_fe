'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

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
          // Defer the onLoadingComplete call to avoid updating state during render
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
      {/* Sky background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-100 to-sky-300"></div>
      {/* Clouds */}
      <motion.div
        className="absolute left-0 top-[10%] h-24 w-48" // Tăng từ h-16 w-32
        initial={{ x: -150 }} // Tăng để phù hợp với kích thước lớn hơn
        animate={{ x: 'calc(100vw + 150px)' }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      >
        <Image
          src="/load/c1.svg"
          alt="Cloud"
          width={450} // Tăng từ 300
          height={375} // Tăng từ 250
          className="h-full w-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute left-0 top-[25%] h-30 w-60" // Tăng từ h-20 w-40
        initial={{ x: -225 }} // Tăng để phù hợp với kích thước lớn hơn
        animate={{ x: 'calc(100vw + 225px)' }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          delay: 0.5,
        }}
      >
        <Image
          src="/load/c2.svg"
          alt="Cloud"
          width={450} // Tăng từ 300
          height={375} // Tăng từ 250
          className="h-full w-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute left-0 top-[40%] h-21 w-42" // Tăng từ h-14 w-28
        initial={{ x: -120 }} // Tăng để phù hợp với kích thước lớn hơn
        animate={{ x: 'calc(100vw + 120px)' }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          delay: 1,
        }}
      >
        <Image
          src="/load/c3.svg"
          alt="Cloud"
          width={168} // Tăng từ 112
          height={84} // Tăng từ 56
          className="h-full w-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute left-0 top-[60%] h-24 w-48" // Tăng từ h-16 w-32
        initial={{ x: -180 }} // Tăng để phù hợp với kích thước lớn hơn
        animate={{ x: 'calc(100vw + 180px)' }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          delay: 1.5,
        }}
      >
        <Image
          src="/load/c4.svg"
          alt="Cloud"
          width={192} // Tăng từ 128
          height={96} // Tăng từ 64
          className="h-full w-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute left-0 top-[75%] h-30 w-45" // Tăng từ h-20 w-30
        initial={{ x: -135 }} // Tăng để phù hợp với kích thước lớn hơn
        animate={{ x: 'calc(100vw + 135px)' }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          delay: 2,
        }}
      >
        <Image
          src="/load/c5.svg"
          alt="Cloud"
          fill
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* Logo in the center */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={logoControls}
      >
        <img
          src={'/logo.svg?height=200&width=150'}
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
