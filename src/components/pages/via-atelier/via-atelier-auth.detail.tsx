'use client';

import Container from '@/components/container/container';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import ContactBlackForm from '@/components/container/contact.-black.container';

const ViaAAuth = () => {
  return (
    <Container className="mx-auto ">
      <h1 className="mt-16 mb-10 font-sans text-white text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
        Explore our versatile co–working environments
      </h1>
      <div className="relative w-full h-[600px]">
        <Image
          src="/img/hero1.png"
          alt="Top Banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      <Container>
        {/* Headline */}
        <p className="text-base leading-relaxed text-neutral-200 font-sans">
          Skyline Nexus is a bold addition to Manchester's evolving cityscape,
          redefining commercial architecture with its striking geometric form
          and reflective glass façade. A landmark of modern design, it serves as
          a hub for forward-thinking enterprises, offering a workspace that
          embodies sophistication, efficiency, and the spirit of progress.
        </p>
        <div className="mx-auto grid grid-cols-1 px-4 py-12 lg:grid-cols-12 lg:gap-x-12">
          <motion.div
            className="space-y-6 lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 text-sm text-neutral-300 font-mono uppercase">
              <h3 className="text-neutral-400 tracking-widest">
                Exhibition Details
              </h3>

              <div className="space-y-4 border-t border-neutral-700 pt-4">
                <div className="space-y-1 border-b border-neutral-700 pb-4">
                  <p className="text-neutral-500 tracking-wide">(Category)</p>
                  <p className="text-white normal-case font-sans">Via Privé</p>
                </div>

                <div className="space-y-1 border-b border-neutral-700 pb-4">
                  <p className="text-neutral-500 tracking-wide">
                    (Start Date - End Date)
                  </p>
                  <p className="text-white normal-case font-sans">2025</p>
                </div>

                <div className="space-y-1 border-b border-neutral-700 pb-4">
                  <p className="text-neutral-500 tracking-wide">(Location)</p>
                  <p className="text-white normal-case font-sans">Seoul, KR</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="space-y-8 lg:col-span-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Description */}

            <motion.p
              className="text-sm text-neutral-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              If you do not have an account please fill out the form below.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <Link
                href="#contact"
                className="group flex items-center justify-center space-x-2 bg-pink-100 px-8 py-3 text-black transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
              >
                <span>Contact Now</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Link>

              <Link
                href="#details"
                className="group flex items-center justify-center space-x-2 border border-pink-100 bg-transparent px-8 py-3 text-pink-100 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
              >
                <span>See Detail</span>
                <Eye className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <section id="contact" className="mt-12">
          <ContactBlackForm />
        </section>
      </Container>
    </Container>
  );
};

export default ViaAAuth;
