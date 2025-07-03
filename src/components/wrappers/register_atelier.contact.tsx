'use client';

import { useRef, useState } from 'react';
import type { CreateRegisterItem } from '@/types';
import { Input, Button } from '@/components';
import { useTranslations } from 'next-intl';
import { registerFormSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactError } from '@/constants';
import { useCreateRegister } from '@/hooks';

export default function ExhibitionRegisterForm() {
  const t = useTranslations('ContactPage');
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
    },
  });

  const { mutate: createContact } = useCreateRegister();

  const handleSentContact = (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);

    const contactData: CreateRegisterItem = {
      ...values,
    };

    createContact(contactData, {
      onSuccess: () => {
        form.reset({
          name: '',
          email: '',
          phone_number: '',
        });
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
    <div ref={formRef} className="mx-auto">
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(handleSentContact)}
      >
        {/* Group 3 input fields in 1 row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t('name')}
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...form.register('name')}
            />
          </div>

          <div className="flex flex-col space-y-2">
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

          <div className="flex flex-col space-y-2">
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
  );
}
