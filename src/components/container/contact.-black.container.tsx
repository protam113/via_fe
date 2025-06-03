'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactBlackForm() {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      ref={formRef}
      className="grid md:grid-cols-2 gap-8 mb-16  mx-auto"
      style={{
        opacity: loaded && isInView ? 1 : 0,
        transform: loaded && isInView ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {/* Left side - Map and Contact Info */}
      <div className="space-y-6">
        <div className="h-[450px] w-full overflow-hidden border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.95923013567335!2d106.73027138947603!3d10.784660643747342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175250f3894da1d%3A0x73d02581cf89c552!2sTomuraLee%20Gallery!5e0!3m2!1sen!2s!4v1747469332976!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="space-y-6">
        <form className="space-y-4 text-white">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="Smiakis" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="nation" className="text-sm font-medium">
                Nation
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vietnam">Vietnam</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                  <SelectItem value="korea">Korea</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="upc.creator@hanhsocial.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input id="phone" placeholder="+00000000" />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Message"
              className="min-h-[120px]"
            />
          </div>

          <Button className="w-full bg-white hover:bg-gray-200 text-black">
            REACH US
          </Button>
        </form>
      </div>
    </div>
  );
}
