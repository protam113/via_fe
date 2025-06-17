'use client';

import { useRef, useState } from 'react';
import { Textarea, Input, Button } from '@/components';
import SelectCountriesCombo from '@/components/common/options/contact_country.option';
import { CreateContactItem } from '@/types';
import { useCreateContact } from '@/hooks';
import { useTranslations } from 'next-intl';
import { ComponentsIcons } from '@/assets/icons/icons';

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
        <div className="grid grid-col  gap-12">
          {/* Address */}

          <div className="flex items-start gap-3">
            <ComponentsIcons.MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">LOCATION</p>
              <p className="text-sm text-gray-500">
                Ho Chi Minh City, VietNam, 90001
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <ComponentsIcons.Phone className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">HOTLIE</p>
              <p className="text-sm text-gray-500">+84 (969) 121-006</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <ComponentsIcons.Mail className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">EMAIL</p>
              <p className="text-sm text-gray-500">
                vietnaminternationalartfair@gmail.com
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-3">
            <ComponentsIcons.Clock className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">OPEN HOURS</p>
              <div className="grid grid-cols-2 text-sm text-gray-500">
                <p>9:30 AM – 6:30 PM (Tue -Sat)</p>
                <p>9:30 AM – 5:00 PM(Sun)</p>
              </div>
            </div>
          </div>
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
