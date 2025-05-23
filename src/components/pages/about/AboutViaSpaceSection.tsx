import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import MainButton from '@/components/button/main.button';
import Header from '@/components/design/header';
import Container from '@/components/container/container';

export default function AboutViaSpaceSection() {
  return (
    <Container className="mx-auto py-16 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left Column - About Via Space */}
        <div className="w-full md:w-[30%] flex flex-col">
          <Header title="About Via Space" />
          <div className="flex-grow flex flex-col">
            <div className=" overflow-hidden  mb-4 mt-6">
              <Image
                src="/img/hero1.png?height=400&width=600"
                alt="Art Exhibition at Via Space"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-all duration-300 hover:opacity-95"
              />
            </div>
            <p className="text-gray-700 text-base leading-6">
              Learn about our mission, values, and what sets Socio Space apart.
              We're committed to providing a supportive, inspiring community for
              professionals like you. Join us to experience a co-working space
              like no other.
            </p>
          </div>
        </div>

        {/* Center Column - Building Image */}
        <div className="w-full md:w-[40%] px-4 flex justify-center">
          <div className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
            <Image
              src="/img/via_home.jpg?height=800&width=600"
              alt="Tomura Lee Building Facade"
              width={600}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Column - Elevate Your Work Experience */}
        <div className="w-full md:w-[30%] flex flex-col">
          <h2 className="text-3xl font-bold mb-4">
            ELEVATE YOUR WORK EXPERIENCE
          </h2>
          <h3 className="text-xl text-gray-800 mb-4">
            Discover the Essence of Socio Space — Our Mission, Values, and What
            Makes Us Unique.
          </h3>
          <p className="text-gray-700 text-base leading-6 mb-6">
            At Socio Space, our mission is to foster a collaborative environment
            that fuels creativity and productivity. Our core values are rooted
            in community, innovation, and support. We're dedicated to creating a
            space where professionals like you can thrive, grow, and network.
            Join us today to immerse yourself in a co-working experience that
            transcends the ordinary, and embark on a journey of professional and
            personal growth.
          </p>
          <MainButton href="/contact" title="Contact us" />
        </div>
      </div>
    </Container>
  );
}
