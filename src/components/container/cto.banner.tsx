'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

const CtoBanner = () => {
  return (
    <div className="relative w-full h-[1200px] overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full overflow-hidden">
          <div className="w-full h-full bg-[url(/img/hero1.png)] bg-cover bg-center" />
        </div>

        <Card className="absolute top-1/3 left-1/2 transform -translate-x-1/2 p-[100px] bg-white border-none rounded-none shadow-none">
          <CardContent className="flex flex-col w-[450px] items-center gap-[55px] p-0">
            <div className="flex flex-col items-center w-full">
              <p className="text-center font-light text-neutral-950 text-[19.8px] tracking-[-0.20px] leading-6">
                We always eager to explore new projects and <br />
                collaboration opportunities. Feel free to reach <br />
                out, and let&#39;s bring visionary designs to life
              </p>

              <p className="text-center font-light text-neutral-950 text-[19.5px] tracking-[-0.20px] leading-6 whitespace-nowrap">
                together.
              </p>
            </div>

            <div className="relative w-[161px] h-[190px]">
              <div className="absolute w-[161px] h-[157px] top-4 left-0 bg-[url(/clip-path-group-1.png)] bg-[100%_100%]" />
              <Image src="/logo.svg" alt="VIA Logo" fill />
            </div>

            <div className="relative w-full h-[67.61px]">
              <div className="absolute w-[90px] h-[19px] top-0 left-[180px] overflow-hidden group">
                <div className="font-light text-neutral-950 text-[15.5px] tracking-[-0.16px] leading-[19.2px] whitespace-nowrap">
                  Get in Touch
                </div>
                <div className="w-[90px] h-0.5 bg-neutral-950 mt-[17px] transform transition-transform duration-300 group-hover:translate-x-0" />
              </div>

              <div className="absolute w-[164px] h-[19px] top-6 left-[143px] overflow-hidden group">
                <div className="font-light text-neutral-950 text-[15.4px] tracking-[-0.16px] leading-[19.2px] whitespace-nowrap">
                  Info@aetherstudio.com
                </div>
                <div className="w-[164px] h-0.5 bg-neutral-950 mt-[17px] transform transition-transform duration-300 group-hover:translate-x-0" />
              </div>

              <div className="absolute w-[181px] h-[19px] top-12 left-[134px] overflow-hidden group">
                <div className="font-light text-neutral-950 text-[15.5px] tracking-[-0.16px] leading-[19.2px] whitespace-nowrap">
                  Instagram:@aetherStudio
                </div>
                <div className="w-[181px] h-0.5 bg-neutral-950 mt-[17px] transform transition-transform duration-300 group-hover:translate-x-0" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CtoBanner;
