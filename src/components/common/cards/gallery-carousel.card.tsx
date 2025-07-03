'use client';

import { Card, CardContent } from '@/components';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Companies } from '@/types';

export default function CompanyComponent({
  companies,
}: {
  companies: Companies[];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {companies.map((company, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="h-32  hover:shadow-xl transition-shadow duration-300">
                <CardContent className="h-full p-6 flex flex-col justify-center items-center">
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex justify-center items-center"
                  >
                    <div className="w-full h-[150px] relative flex justify-center items-center overflow-hidden rounded-xl ">
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </a>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
