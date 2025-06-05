'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowIcons } from '@/assets/icons/icons';

const MainButton = ({ href, title }: { href: string; title: string }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };
  return (
    <motion.button
      className="group flex items-center border border-neutral-900 px-6 py-3 text-sm font-medium transition-all hover:bg-neutral-900 hover:text-white"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {title}
      <ArrowIcons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
};

export default MainButton;
