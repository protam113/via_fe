'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import BackMainButton from '@/components/common/button/back-main.button';
import Container from '@/components/container/container';

export default function ExhibitionDetail() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
  };

  return (
    <div className="mx-auto px-4 py-12 md:px-8 lg:px-12">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-8"
      >
        <motion.div variants={item}>
          <BackMainButton title="Back to Exhbitons" href="/via-art-fair" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={item} className="md:col-span-2 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Kozmo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Ut nunc, dui sit sit nisi, cras velit lorem. Laoreet gravida
              adipiscing augue sit justo elit. Mauris bibendum mattis et diam
              tellus. Auctor mauris felis lobortis tempus.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="font-mono text-xs uppercase tracking-wider space-y-6"
          >
            <div className="space-y-1">
              <p className="text-muted-foreground">(CATEGORY)</p>
              <p>VIA Privé</p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">(CLIENT)</p>
              <p>Nexus Group</p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">(START DATE - END DATE)</p>
              <p>2025</p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">(LOCATION)</p>
              <p>Seoul, KR</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative w-full mt-8"
          style={{
            perspective: '1000px',
          }}
        >
          <motion.div
            initial={{ y: 0 }}
            whileInView={{
              y: [0, -10, 0],
              transition: {
                y: {
                  repeat: 0,
                  duration: 1.5,
                  ease: 'easeInOut',
                },
              },
            }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="w-full h-[500px]">
              <Image
                src="/img/hero1.png"
                alt="Kozmo exhibition space showing multiple artworks displayed on white walls"
                fill
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <Container>
        <div className="mx-auto px-4 py-12 space-y-10 ">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Intersections of Art and Environment
            </h1>
            <p className="text-lg  leading-relaxed">
              This exhibition explores how both artists address the theme of
              environment, albeit through vastly different lenses. Vanessa
              Marsh’s paintings are lush and expansive, filled with clouds and
              other natural elements, using photographic processes and painting
              techniques to create dreamlike landscapes. Conversely, Zahrah
              Alghamdi and Wesaam Al-Badry’s works bring a sense of material
              culture, often using rich physical textures to communicate the
              lived experience of these environments.
            </p>
            <p className="text-lg  leading-relaxed">
              This contrast serves as a context for exploring the complexities
              of human interaction and its permanent impact on the landscape.
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
              geography on cultural identity. Through their distinct materials
              and subjects, both artists communicate a personal language about
              the environments they’ve experienced.
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
              The entire exhibition proposes a deeper examination of how
              cultural and spatial conditions affect our perception of space and
              place. Vanessa’s work, synthesized forms paired with saturated
              colorways, represent recontextualized symbols; a material
              reflection of artistic adaptation and the subsequent loss or
              inheritance of world.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
