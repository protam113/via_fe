'use client';

import Container from '@/components/wrappers/container';
import Header from '@/components/common/design/header';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React, { useState, useEffect, useRef } from 'react';

export const ExperienceSection = () => {
  const stats = [
    {
      number: '40+',
      numericValue: 40,
      title: 'Events Curated',
      description:
        'Successfully organized over 80 exhibitions and events, from art showcases to tech summits.',
    },
    {
      number: '150+',
      numericValue: 150,
      title: 'Attendees Engaged',
      description:
        'Our events have reached 30,000+ attendees globally — professionals, creatives, and changemakers alike.',
    },
    {
      number: '$2B+',
      numericValue: 2,
      prefix: '$',
      suffix: 'B+',
      title: 'Industry Partnerships',
      description:
        'Collaborated with over 15 organizations, including museums, tech firms, and cultural institutions.',
    },
  ];

  // Reference to the section
  const sectionRef = useRef(null);
  // State to track if section is visible
  const [isVisible, setIsVisible] = useState(false);
  // State for animated values
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Only observe once
          observer.disconnect();
        }
      },
      {
        threshold: 0.25, // Trigger when 25% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Animation effect
  useEffect(() => {
    if (!isVisible) return;

    // Duration in ms
    const duration = 2000;
    // Update interval in ms
    const interval = 30;
    // Total number of steps
    const steps = duration / interval;
    // Current step
    let step = 0;

    const timer = setInterval(() => {
      step++;

      // Calculate progress (0 to 1)
      const progress = step / steps;

      // Apply easing for smoother animation (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Update each value based on progress
      setAnimatedValues(
        stats.map((stat) => {
          const targetValue = stat.numericValue;
          return Math.min(Math.floor(targetValue * easedProgress), targetValue);
        })
      );

      // Stop when animation completes
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, stats]);

  // Format the displayed value
  const formatValue = (value: any, index: any) => {
    const stat = stats[index];
    const prefix = stat.prefix || '';
    const suffix = stat.suffix || '+';
    return `${prefix}${value}${suffix}`;
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-full items-start relative mb-10"
    >
      {/* Content Section */}
      <div className="flex flex-col items-center gap-2.5 px-4 md:px-8 lg:px-12 bg-white relative w-full">
        <Container className="flex flex-col lg:flex-row w-full items-start justify-between relative py-8 md:py-12">
          {/* Left Column - Mission Statement */}
          <div className="inline-flex items-center justify-center gap-2.5 relative mb-8 lg:mb-0">
            <p className="relative w-fit mt-[-1.00px] font-light text-neutral-950 text-sm tracking-[0] leading-[16.8px]">
              VIA connects ideas, people, and experiences{' '}
              <br className="hidden md:block" />
              through world-class exhibitions and events —{' '}
              <br className="hidden md:block" />
              shaping the future of creativity and innovation.
            </p>
          </div>

          {/* Right Column - Experience Section */}
          <div className="flex flex-col w-full lg:max-w-[800px] items-start gap-6 md:gap-[50px] relative">
            {/* Heading and Description */}
            <div className="flex flex-col items-start gap-3 md:gap-5 relative self-stretch w-full">
              <Header title="Experience" />
              <div className="relative self-stretch w-full">
                <p className="font-light text-neutral-950 text-base md:text-xl tracking-[-0.20px] leading-snug md:leading-6">
                  Each event is a curated experience —{' '}
                  <br className="hidden md:block" />
                  designed to ignite curiosity, spark conversations,{' '}
                  <br className="hidden md:block" />
                  and leave lasting impressions.
                </p>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="flex flex-col items-start gap-4 md:gap-6 relative self-stretch w-full">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="flex flex-col items-start gap-2.5 relative self-stretch w-full border-0 shadow-none"
                >
                  <Separator className="w-full border-black" />
                  <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between relative self-stretch w-full p-0 py-4">
                    <div className="inline-flex items-center justify-center gap-2.5 p-2.5 relative">
                      <div className="relative w-fit mt-[-1.00px] text-neutral-950 text-5xl md:text-6xl lg:text-[83.3px] tracking-[-2px] md:tracking-[-5.16px] leading-tight md:leading-[98.0px] font-light whitespace-nowrap">
                        {formatValue(animatedValues[index], index)}
                      </div>
                    </div>

                    <div className="w-full md:w-[330px] flex flex-col items-start gap-2 relative mt-2 md:mt-0">
                      <div className="relative self-stretch mt-[-1.00px] font-light text-[#8f8f8f] text-xs md:text-[11.6px] tracking-[0] leading-[14.4px]">
                        {stat.title}
                      </div>

                      <div className="relative self-stretch font-light text-neutral-950 text-sm md:text-[13.9px] tracking-[0] leading-[16.8px]">
                        {stat.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* Image Gallery Section */}
        <div className="flex flex-col md:flex-row w-full items-start justify-center gap-4 md:gap-[25px] py-0 mt-8 md:mt-16 overflow-hidden">
          <div className="flex flex-col w-full md:w-[423px] h-[250px] md:h-[367px] items-start gap-2.5 relative">
            <div className="relative self-stretch w-full h-full bg-[url(/img/banner1.png)] bg-cover bg-[50%_50%]" />
          </div>

          <div className="flex flex-col w-full md:w-[422px] h-[250px] md:h-[361px] items-start gap-2.5 relative overflow-hidden mt-4 md:mt-0">
            <div className="self-stretch w-full h-full bg-[url(/img/banner3.jpg)] relative bg-cover bg-[50%_50%]" />
          </div>

          <div className="inline-flex items-center gap-2.5 relative mt-4 md:mt-0 w-full md:w-auto">
            <div className="w-full md:w-[516px] h-[300px] md:h-[663.41px] bg-[url(/img/banner4.jpg)] relative bg-cover bg-[50%_50%]" />
          </div>
        </div>
      </div>
    </section>
  );
};
