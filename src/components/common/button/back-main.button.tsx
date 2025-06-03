'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const BackMainButton = ({ title, href }: { title: string; href: string }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
  };
  return (
    <motion.div variants={item}>
      <Link
        href={`${href}`}
        className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {title}
      </Link>
    </motion.div>
  );
};

export default BackMainButton;
