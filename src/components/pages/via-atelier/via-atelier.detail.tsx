'use client';

import Container from '@/components/container/container';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ViaA = () => {
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
      <p className="text-base mt-10 leading-relaxed text-neutral-200 font-sans">
        Skyline Nexus is a bold addition to Manchester's evolving cityscape,
        redefining commercial architecture with its striking geometric form and
        reflective glass façade. A landmark of modern design, it serves as a hub
        for forward-thinking enterprises, offering a workspace that embodies
        sophistication, efficiency, and the spirit of progress.
      </p>
      {/* Left Section - 5 columns */}
      <div className="mx-auto grid grid-cols-1 px-4 py-12 lg:grid-cols-12 lg:gap-x-12">
        {/* LEFT: HEADLINE + INFO */}
        <div className="space-y-6 lg:col-span-5">
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
        </div>

        {/* RIGHT: DESCRIPTION + META */}
        <div className="space-y-8 lg:col-span-7">
          <div className="space-y-6 text-sm text-neutral-300 font-mono uppercase">
            <h3 className="text-neutral-400 tracking-widest">
              Additional Info
            </h3>

            <div className="space-y-4 border-t border-neutral-700 pt-4">
              <div className="space-y-1 border-b border-neutral-700 pb-4">
                <p className="text-neutral-500 tracking-wide">(Price)</p>
                <p className="text-white normal-case font-sans">Free Entry</p>
              </div>

              <div className="space-y-1 border-b border-neutral-700 pb-4">
                <p className="text-neutral-500 tracking-wide">
                  (Participation)
                </p>
                <p className="text-white normal-case font-sans">
                  Open Submission
                </p>
              </div>

              <div className="space-y-1 border-b border-neutral-700 pb-4">
                <p className="text-neutral-500 tracking-wide">(Status)</p>
                <p className="text-white normal-case font-sans">Ongoing</p>
              </div>

              <div className="space-y-1 border-b border-neutral-700 pb-4">
                <p className="text-neutral-500 tracking-wide">(Client)</p>
                <p className="text-white normal-case font-sans">
                  K-Art Foundation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 py-12 space-y-10 text-white">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Intersections of Art and Environment
          </h1>
          <p className="text-lg  leading-relaxed">
            This exhibition explores how both artists address the theme of
            environment, albeit through vastly different lenses. Vanessa Marsh’s
            paintings are lush and expansive, filled with clouds and other
            natural elements, using photographic processes and painting
            techniques to create dreamlike landscapes. Conversely, Zahrah
            Alghamdi and Wesaam Al-Badry’s works bring a sense of material
            culture, often using rich physical textures to communicate the lived
            experience of these environments.
          </p>
          <p className="text-lg  leading-relaxed">
            This contrast serves as a context for exploring the complexities of
            human interaction and its permanent impact on the landscape.
          </p>
        </div>

        <div className="space-y-6">
          <Image
            src="/img/banner3.jpg"
            alt="Gallery view"
            width={1200}
            height={800}
            className=" shadow-md w-full object-cover"
          />
          <p className="text-sm  italic">
            In “Resonance: Nature and Structure,” the artworks not only mimic
            but also imitate, creating a narrative about the influence of
            geography on cultural identity. Through their distinct materials and
            subjects, both artists communicate a personal language about the
            environments they’ve experienced.
          </p>
        </div>

        <div className="space-y-6">
          <Image
            src="/img/banner3.jpg"
            alt="Gallery view 2"
            width={1200}
            height={800}
            className=" shadow-md w-full object-cover"
          />
          <p className="text-sm  italic">
            The entire exhibition proposes a deeper examination of how cultural
            and spatial conditions affect our perception of space and place.
            Vanessa’s work, synthesized forms paired with saturated colorways,
            represent recontextualized symbols; a material reflection of
            artistic adaptation and the subsequent loss or inheritance of world.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ViaA;
