'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/container/container';
import MainButton from '@/components/button/main.button';

export default function AboutUsSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const leftTextVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const rightTextVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={ref} className="relative w-full min-h-screen flex flex-col">
      {/* Text Content - Split Layout */}
      <Container>
        <motion.div
          className="w-full mb-10 flex flex-col md:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-full md:w-1/2 mb-8 md:mb-0"
            variants={leftTextVariants}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900">
              About US
            </h2>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 max-w-xl"
            variants={rightTextVariants}
          >
            <p className="text-lg md:text-xl text-neutral-800 mb-8 leading-relaxed">
              VIA specializes in modern architecture and real estate development
              that seamlessly integrates functionality, aesthetics, and
              sustainability. The studio brings a unique global perspective to
              every project. With a commitment to crafting timeless designs.
            </p>
            <MainButton href="about-us" title="    MORE ABOUT US" />
          </motion.div>
        </motion.div>
      </Container>
      {/* Gallery Image Below */}
      <motion.div
        className="w-full h-[70vh]"
        variants={imageVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] transition-all duration-1000 animate-reveal z-10"></div>
          <Image
            src="/img/hero1.png"
            alt="Art gallery exhibition"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onLoadingComplete={(image) => {
              // Remove blur effect when image is loaded
              const blurElement = image.parentElement?.querySelector(
                '.backdrop-blur-[2px]'
              );
              if (blurElement) {
                blurElement.classList.remove('backdrop-blur-[2px]');
                blurElement.classList.add('backdrop-blur-0');
              }
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
