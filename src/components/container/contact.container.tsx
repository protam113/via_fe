'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import SelectCountriesCombo from '@/components/common/options/contact_country.option';
import { CreateContactItem } from '@/types/types';
import { useCreateContact } from '@/hooks/contact/useContact';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState<CreateContactItem>({
    name: '',
    email: '',
    phone_number: '',
    message: '',
    location: '',
  });

  const [selectedCountry, setSelectedCountry] = useState<{
    id: number;
    name: string;
    iso2: string;
  } | null>(null);

  const { mutate: createContact } = useCreateContact();

  const handleSentContact = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      if (contactData.name.trim() === '') {
        alert('Name is required');
        setIsLoading(false);
        return;
      }

      if (contactData.email.trim() === '') {
        alert('Email is required');
        setIsLoading(false);
        return;
      }

      // Kiểm tra selectedCountry thay vì contactData.location
      if (!selectedCountry) {
        alert('Please select a country');
        setIsLoading(false);
        return;
      }

      if (contactData.message.trim() === '') {
        alert('Message is required');
        setIsLoading(false);
        return;
      }

      // Đảm bảo location được set từ selectedCountry
      const productDataToSend: CreateContactItem = {
        ...contactData,
        location: selectedCountry.name, // Lấy từ selectedCountry
      };

      createContact(productDataToSend);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form
      setContactData({
        name: '',
        email: '',
        phone_number: '',
        message: '',
        location: '',
      });
      setSelectedCountry(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi gửi form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={formRef} className="grid md:grid-cols-2 gap-8 mb-16 mx-auto">
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
        <form className="space-y-4" onSubmit={handleSentContact}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t('name')}
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={contactData.name}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="nation" className="text-sm font-medium">
                {t('nation')}
              </label>
              <SelectCountriesCombo
                selectedCountryId={selectedCountry?.id || null}
                onChange={(country) => {
                  setSelectedCountry(country);
                  setContactData((prev) => ({
                    ...prev,
                    location: country ? country.name : '',
                  }));
                }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                {t('phone_number')}
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={contactData.phone_number}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={contactData.email}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t('message')}
            </label>
            <Textarea
              id="message"
              placeholder="Type your message here"
              value={contactData.message}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : t('message')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
