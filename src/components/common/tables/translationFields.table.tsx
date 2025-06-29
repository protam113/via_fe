import { useState, useEffect } from 'react';
import { translationFields } from '@/types';
import { Label, Textarea, Input } from '@/components';
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from '@/utils/formatters/format_currency.utils';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import { exhibitionFormSchema } from '@/utils';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  lang: string;
  getTranslationValue: (lang: string, field: string) => any;
  updateTranslation: (
    lang: string,
    field: string,
    value: string | number
  ) => void;
  errors: FieldErrors<z.infer<typeof exhibitionFormSchema>>;
  register: UseFormRegister<z.infer<typeof exhibitionFormSchema>>;
}

export type TranslationField = {
  name: string;
  label: string;
  placeholder: string;
  type: 'input' | 'number' | 'richtext' | 'textarea';
};

type TranslationFieldName = keyof z.infer<
  typeof exhibitionFormSchema
>['translations'][number];

export function TranslationFields({
  lang,
  getTranslationValue,
  updateTranslation,
  errors,
  register,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {translationFields.map((field) => {
        const isNumber = field.type === 'number';
        const currency = lang === 'en' ? 'USD' : 'VND';
        const value = getTranslationValue(lang, field.name);

        const [isComposing, setIsComposing] = useState(false);
        const [displayValue, setDisplayValue] = useState(String(value));

        useEffect(() => {
          if (!isNumber) {
            setDisplayValue(value);
          } else {
            const parsed = parseCurrencyInput(value);
            setDisplayValue(formatCurrencyInput(parsed, currency));
          }
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          setDisplayValue(raw);

          if (!isComposing && isNumber) {
            const parsed = parseCurrencyInput(raw);
            updateTranslation(lang, field.name, parsed);
          } else if (!isNumber) {
            updateTranslation(lang, field.name, raw);
          }
        };

        const isFullWidth = field.type === 'richtext' || field.name === 'title';
        const colSpan = isFullWidth ? 'md:col-span-2' : '';

        const translationIndex = lang === 'en' ? 0 : 1;

        const fieldName = field.name as TranslationFieldName;

        const fieldError = (errors?.translations?.[translationIndex] ?? {})[
          fieldName
        ];

        return (
          <div className={`space-y-2 ${colSpan}`} key={`${lang}-${field.name}`}>
            <Label>
              {field.label} ({lang === 'en' ? 'English' : 'Vietnamese'})
            </Label>
            {fieldError?.message && (
              <p className="text-red-500 text-sm">{fieldError.message}</p>
            )}
            {field.type === 'input' || field.type === 'number' ? (
              <Input
                value={displayValue}
                type="text"
                placeholder={field.placeholder}
                onChange={handleChange}
                onFocus={() => {
                  if (isNumber) {
                    const parsed = parseCurrencyInput(value);
                    setDisplayValue(String(parsed)); // gõ lại từ số gốc
                  }
                }}
                onBlur={() => {
                  if (!isComposing && isNumber) {
                    const parsed = parseCurrencyInput(displayValue);
                    setDisplayValue(formatCurrencyInput(parsed, currency)); // chỉ format ở đây
                  }
                }}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => {
                  setIsComposing(false);
                  if (isNumber) {
                    const parsed = parseCurrencyInput(displayValue);
                    updateTranslation(lang, field.name, parsed);
                  }
                }}
                className="w-full rounded-none border bg-gray-200 border-gray-400 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : field.type === 'textarea' ? (
              <Textarea
                placeholder={field.placeholder}
                value={value}
                onChange={(e) =>
                  updateTranslation(lang, field.name, e.target.value)
                }
                className="w-full rounded-none border bg-gray-200 border-gray-400 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : field.type === 'richtext' ? (
              <RichTextEditor
                initialContent={value}
                onChange={(val) =>
                  updateTranslation(lang, field.name, val.html)
                }
                className="w-full rounded-none cursor-text"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
