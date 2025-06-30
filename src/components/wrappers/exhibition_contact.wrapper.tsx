'use client';

import { useRef, useState } from 'react';

import type { CreateContactItem } from '@/types';

import { Textarea, Input, Button } from '@/components';
import SelectCountriesCombo from '@/components/common/options/contact_country.option';
import { useCreateContact } from '@/hooks';
import { useTranslations } from 'next-intl';
import { contactSentFormSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactError } from '@/constants';

export default function ExhibitionContactForm({
  exhibition_id,
}: {
  exhibition_id: string;
}) {
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
      ...values,
      exhibition_id,
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
    <div ref={formRef} className=" mx-auto">
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
