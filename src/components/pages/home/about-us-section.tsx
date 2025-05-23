'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Container from '@/components/container/container';
import MainButton from '@/components/button/main.button';
import Header from '@/components/design/header';

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
    <section ref={ref} className="relative w-full flex flex-col">
      {/* Text Content - Split Layout */}
      <Container>
        <motion.div
          className="w-full mb-10 flex flex-col md:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-full mb-8 md:mb-0"
            variants={leftTextVariants}
          >
            <Header title="About Us" />
          </motion.div>

          <motion.div className="w-full  max-w-xl" variants={rightTextVariants}>
            <p className="text-lg md:text-xl text-neutral-800 mb-8 leading-relaxed">
              VIA specializes in modern architecture and real estate development
              that seamlessly integrates functionality, aesthetics, and
              sustainability. The studio brings a unique global perspective to
              every project. With a commitment to crafting timeless designs.
            </p>
            <MainButton href="about" title="    MORE ABOUT US" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
