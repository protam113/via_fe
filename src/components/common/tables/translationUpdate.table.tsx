// TranslationUpdateFields.tsx
'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AdminTranslations,
  translationFields,
  UpdateBottomExhibitionData,
  UpdateTranslationData,
} from '@/types';
import { Label, Textarea, Input } from '@/components';
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from '@/utils/formatters/format_currency.utils';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import { exhibitionUpdateBottomSchema } from '@/utils';
import type { z } from 'zod';
import { useUpdateTranslationExhibiton } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn, Controller } from 'react-hook-form';
import { debounce } from './translationFields.table';

type Currency = 'USD' | 'VND';

interface Props {
  translation?: AdminTranslations;
  lang: string;
}

export type TranslationField = {
  name: string;
  label: string;
  placeholder: string;
  type: 'input' | 'number' | 'richtext' | 'textarea';
};

const TranslationUpdateFieldItem = ({
  field,
  lang,
  value,
  currency,
  fieldError,
  onChange,
}: {
  field: TranslationField;
  lang: string;
  value: any;
  currency: Currency;
  fieldError?: any;
  onChange: (value: any) => void;
}) => {
  const isNumber = field.type === 'number';
  const [localValue, setLocalValue] = useState(() => {
    if (isNumber) {
      const parsed = parseCurrencyInput(value);
      return formatCurrencyInput(parsed, currency);
    }
    return String(value || '');
  });

  // Sync khi prop value thay đổi
  useEffect(() => {
    if (isNumber) {
      const parsed = parseCurrencyInput(value);
      setLocalValue(formatCurrencyInput(parsed, currency));
    } else {
      setLocalValue(String(value || ''));
    }
  }, [value, isNumber, currency]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);

    if (isNumber) {
      const parsed = parseCurrencyInput(newValue);
      onChange(parsed);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div
      className={`space-y-2 ${
        field.type === 'richtext' || field.name === 'title'
          ? 'md:col-span-2'
          : ''
      }`}
    >
      <Label>
        {field.label} ({lang === 'en' ? 'English' : 'Vietnamese'})
      </Label>
      {fieldError?.message && (
        <p className="text-red-500 text-sm">{fieldError.message}</p>
      )}

      {field.type === 'input' || field.type === 'number' ? (
        <Input
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          placeholder={field.placeholder}
          className="w-full rounded-none border bg-gray-100 border-gray-300"
        />
      ) : field.type === 'textarea' ? (
        <Textarea
          placeholder={field.placeholder}
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full rounded-none border bg-gray-100 border-gray-300 "
        />
      ) : field.type === 'richtext' ? (
        <RichTextEditor
          initialContent={value}
          onChange={(val) => {
            onChange(val.html);
          }}
          className="w-full rounded-none "
        />
      ) : null}
    </div>
  );
};

export function TranslationUpdateFields({ translation, lang }: Props) {
  const currency = useMemo(
    () => (lang === 'en' ? 'USD' : 'VND') as Currency,
    [lang]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: updateTranslation } = useUpdateTranslationExhibiton();

  const form = useForm<z.infer<typeof exhibitionUpdateBottomSchema>>({
    resolver: zodResolver(exhibitionUpdateBottomSchema),
    defaultValues: {
      translations: [
        {
          language: 'en',
          title: translation?.title || '',
          description: translation?.description || '',
          content: translation?.content || '',
          location: translation?.location || '',
          price: translation?.price || 0,
        },
        {
          language: 'vn',
          title: translation?.title || '',
          description: translation?.description || '',
          content: translation?.content || '',
          location: translation?.location || '',
          price: translation?.price || 0,
        },
      ],
    },
  });

  // Update form values when translation prop changes
  useEffect(() => {
    if (translation) {
      const currentLangIndex = lang === 'en' ? 0 : 1;
      form.setValue(
        `translations.${currentLangIndex}.title`,
        translation.title || ''
      );
      form.setValue(
        `translations.${currentLangIndex}.description`,
        translation.description || ''
      );
      form.setValue(
        `translations.${currentLangIndex}.content`,
        translation.content || ''
      );
      form.setValue(
        `translations.${currentLangIndex}.location`,
        translation.location || ''
      );
      form.setValue(
        `translations.${currentLangIndex}.price`,
        translation.price || 0
      );
    }
  }, [translation, lang, form]);

  const handleUpdatTranslation = (
    values: z.infer<typeof exhibitionUpdateBottomSchema>
  ) => {
    setIsSubmitting(true);
    if (!translation?.id) return;

    const currentTranslation = values.translations?.find(
      (t) => t.language === lang
    );
    if (!currentTranslation) return;

    const translationData: UpdateTranslationData = {
      title: currentTranslation.title || '',
      description: currentTranslation.description || '',
      content: currentTranslation.content || '',
      location: currentTranslation.location || '',
      price: currentTranslation.price || 0,
    };

    updateTranslation(
      { updatePost: translationData, postId: translation?.id },
      {
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: (error: any) => {
          form.setError('root', {
            type: 'manual',
            message: error.message || 'Error',
          });
          setIsSubmitting(false);
        },
      }
    );
  };

  const currentLangIndex = lang === 'en' ? 0 : 1;

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdatTranslation)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {translationFields.map((field) => {
          const fieldName =
            `translations.${currentLangIndex}.${field.name}` as keyof z.infer<
              typeof exhibitionUpdateBottomSchema
            >;

          return (
            <Controller
              key={`${lang}-${field.name}`}
              name={fieldName}
              control={form.control}
              render={({ field: formField, fieldState }) => (
                <TranslationUpdateFieldItem
                  field={field}
                  lang={lang}
                  value={formField.value}
                  currency={currency}
                  fieldError={fieldState.error}
                  onChange={formField.onChange}
                />
              )}
            />
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
}
