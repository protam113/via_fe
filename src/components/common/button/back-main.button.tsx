'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowIcons } from '@/assets/icons/icons';

const BackMainButton = ({ title, href }: { title: string; href: string }) => {
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut', // OK now
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div variants={item} initial="hidden" animate="show">
      <Link
        href={href}
        className="inline-flex items-center text-xl font-mono text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
      >
        <ArrowIcons.ArrowLeft className="mr-2 h-4 w-4" />
        {title}
      </Link>
    </motion.div>
  );
};

export default BackMainButton;
