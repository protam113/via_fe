'use client';

import CustomImage from '@/components/common/design/image.component';
import { cn } from '@/utils/helpers/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const slides = [
  {
    id: 1,
    image: '/img/hero1.png?height=80&width=80',
    category: "Via Prive'",
    title: 'Exhibition: The Art of Sailing',
    href: '/exhibitions',
    alt: 'Luxury sailboat on ocean waters with golden sunlight',
  },
  {
    id: 2,
    image: '/img/hero2.png?height=80&width=80',
    category: 'Via Atelier',
    title: 'Exhibition: The Art of Sailing',
    href: '/exhibitions',
    alt: 'Modern motor yacht cruising in blue waters',
  },
  {
    id: 3,
    image: '/img/hero4.png?height=80&width=80',
    category: 'Via Art Fair',
    title: 'Exhibition: The Art of Sailing',
    href: '/exhibitions',
    alt: 'Luxury superyacht anchored in Mediterranean bay',
  },
];

const featuredYachts = [
  {
    id: 1,
    title: 'Exhibition: The Art of Sailing',
    category: "Via Prive'",
    image: '/img/hero1.png?height=80&width=80',
  },
  {
    id: 2,
    title: 'Exhibition: The Art of Sailing',
    category: 'Via Atelier',

    image: '/img/hero2.png?height=80&width=80',
  },
  {
    id: 3,
    title: 'Exhibition: The Art of Sailing',
    category: 'Via Art Fair',

    image: '/img/hero4.png?height=80&width=80',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const slideInFromLeft = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentSlide = slides[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? slides.length - 1 : prevIndex - 1;
      }
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <motion.section
      className="relative min-h-screen w-full overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0"
          >
            <CustomImage
              key={currentSlide.image}
              src={currentSlide.image || '/placeholder.svg'}
              alt={currentSlide.alt}
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 z-20 flex items-center">
        <motion.button
          onClick={() => paginate(-1)}
          className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      <div className="absolute inset-y-0 right-4 z-20 flex items-center">
        <motion.button
          onClick={() => paginate(1)}
          className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between p-6 md:p-12 lg:p-16">
        {/* Top Section */}
        <div className="mt-30 md:mt-24 lg:mt-90 space-y-8">
          {/* Top Section */}
          <div className="flex flex-col space-y-8">
            {/* Category Label */}
            <motion.div variants={slideInFromLeft} className="self-start">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-medium tracking-wider text-white/90 uppercase"
                >
                  {currentSlide.category}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              variants={slideInFromLeft}
              className="flex flex-col max-w-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  {currentSlide.title}
                </motion.h1>
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="self-end flex justify-between w-full"
              >
                <Link
                  href={currentSlide.href}
                  className={cn(
                    'flex items-center space-x-2 mt-8 group transform transition-all duration-1000 ease-out delay-400'
                  )}
                >
                  <span className="text-sm text-white font-medium tracking-wider uppercase">
                    View more
                  </span>
                  <EyeIcon
                    size={16}
                    className="transition-transform text-white group-hover:scale-110"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Divider Line */}
        <motion.div
          variants={fadeInUp}
          className="my-8 h-px w-full bg-white/30"
        />

        {/* Bottom Section */}
        <div className="flex  flex-col space-y-8">
          {/* Featured Section Header */}
          <motion.div
            variants={slideInFromLeft}
            className="flex items-center justify-between"
          >
            <span className="text-sm font-medium tracking-wider text-white/90 uppercase">
              FEATURED
            </span>
          </motion.div>

          {/* Featured Yachts Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-3"
          >
            {featuredYachts.map((yacht, index) => (
              <motion.div
                key={yacht.id}
                variants={fadeInUp}
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="flex items-start space-x-4"
                  onClick={() => goToSlide(index)}
                >
                  <div className="flex-shrink-0">
                    <div className="relative h-16 w-16 overflow-hidden  bg-white/10 backdrop-blur-sm">
                      <Image
                        src={yacht.image || '/placeholder.svg'}
                        alt={`Yacht ${yacht.id}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium leading-relaxed text-white transition-colors group-hover:text-white/80">
                      {yacht.category}
                    </h3>
                    <h3 className="sm:text-sm lg:text-lg font-medium leading-relaxed text-white transition-colors group-hover:text-white/80">
                      {yacht.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
