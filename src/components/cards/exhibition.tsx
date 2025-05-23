'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ExhibitionProps {
  exhibition: {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
    link: string;
  };
}

export default function Exhibition({ exhibition }: ExhibitionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageX = useTransform(scrollYProgress, [0, 0.3], ['-100%', '0%']);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.4], ['50px', '0px']);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col relative overflow-hidden snap-start"
    >
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            x: imageX,
            opacity: imageOpacity,
          }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ y: parallaxY }}
          >
            <Image
              src={exhibition.image || '/placeholder.svg'}
              alt={exhibition.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 max-w-5xl mx-auto"
        style={{
          y: textY,
          opacity: textOpacity,
        }}
      >
        <div className="text-sm text-gray-500 mb-4">{exhibition.date}</div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {exhibition.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          {exhibition.description}
        </p>
        <Link
          href={exhibition.link}
          className="inline-flex items-center text-lg font-medium group w-fit"
        >
          <span className="mr-2">Read Article</span>
          <motion.span
            className="inline-block"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
