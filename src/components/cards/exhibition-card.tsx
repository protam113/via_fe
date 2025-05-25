'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CustomImage from '../design/image.component';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export function CategoryCard({
  title,
  description,
  imageSrc,
}: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-none aspect-[3/4] group w-full"
    >
      <div className="absolute inset-0">
        <CustomImage
          src={imageSrc || '/placeholder.svg'}
          alt={title}
          fill
          priority={isInView} // Load image early if it's in view
          loading={isInView ? undefined : 'lazy'}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-sm opacity-90"
        >
          {description}
        </motion.div>
      </div>
    </motion.div>
  );
}
