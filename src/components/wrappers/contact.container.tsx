'use client';

import { useRef, useState } from 'react';
import { Textarea, Input, Button } from '@/components';
import SelectCountriesCombo from '@/components/common/options/contact_country.option';
import { CreateContactItem } from '@/types';
import { useCreateContact } from '@/hooks';
import { useTranslations } from 'next-intl';
import { ComponentsIcons } from '@/assets/icons/icons';
import { contactSentFormSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactError } from '@/constants';

export default function ContactForm() {
  const t = useTranslations('ContactPage');
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof contactSentFormSchema>>({
    resolver: zodResolver(contactSentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      message: '',
      location: '',
    },
  });

  const [selectedCountry, setSelectedCountry] = useState<{
    id: number;
    name: string;
    iso2: string;
  } | null>(null);

  const { mutate: createContact } = useCreateContact();

  const handleSentContact = (values: z.infer<typeof contactSentFormSchema>) => {
    setIsLoading(true);

    const contactData: CreateContactItem = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      message: values.message,
      location: values.location,
    };

    createContact(contactData, {
      onSuccess: () => {
        form.reset({
          name: '',
          email: '',
          phone_number: '',
          message: '',
          location: '',
        });
        setSelectedCountry(null);
        setIsLoading(false);

        form.clearErrors();
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message: error.message || ContactError.FAILED_SENT_CONTACT,
        });
        setIsLoading(false);
      },
    });
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
              <p className="font-medium"> {t('location')}</p>
              <p className="text-sm text-gray-500">{t('address')}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <ComponentsIcons.Phone className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium"> {t('contact')}</p>
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
              <p className="font-medium">{t('hours')}</p>
              <div className="grid grid-cols-2 text-sm text-gray-500">
                <p>9:30 AM – 6:30 PM (Tue -Sat)</p>
                <br />
                <p>9:30 AM – 5:00 PM(Sun)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="space-y-6">
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleSentContact)}
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t('name')}
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...form.register('name')}
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
                  form.setValue('location', country?.name || '');
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
                {...form.register('phone_number')}
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
              {...form.register('email')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t('message')}
            </label>
            <Textarea
              id="message"
              placeholder="Type your message here"
              {...form.register('message')}
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
