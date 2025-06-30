import { useState, useEffect, useCallback, useMemo } from 'react';
import { translationFields } from '@/types';
import { Label, Textarea, Input } from '@/components';
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from '@/utils/formatters/format_currency.utils';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import type { exhibitionFormSchema } from '@/utils';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { z } from 'zod';

// Import Currency type hoặc define nó
type Currency = 'USD' | 'VND';

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

// Component con để tránh re-render không cần thiết
const TranslationFieldItem = ({
  field,
  lang,
  value,
  currency,
  updateTranslation,
  fieldError,
}: {
  field: TranslationField;
  lang: string;
  value: any;
  currency: Currency;
  updateTranslation: (
    lang: string,
    field: string,
    value: string | number
  ) => void;
  fieldError?: any;
}) => {
  const isNumber = field.type === 'number';
  const [localValue, setLocalValue] = useState(() => {
    if (isNumber) {
      const parsed = parseCurrencyInput(value);
      return formatCurrencyInput(parsed, currency);
    }
    return String(value || '');
  });
  const [isComposing, setIsComposing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce update để giảm số lần gọi API
  const debouncedUpdate = useCallback(
    debounce((lang: string, fieldName: string, val: string | number) => {
      updateTranslation(lang, fieldName, val);
    }, 300),
    [updateTranslation]
  );

  // Chỉ sync khi value từ props thay đổi và không đang focus
  useEffect(() => {
    if (!isFocused) {
      if (isNumber) {
        const parsed = parseCurrencyInput(value);
        setLocalValue(formatCurrencyInput(parsed, currency));
      } else {
        setLocalValue(String(value || ''));
      }
    }
  }, [value, currency, isNumber, isFocused]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setLocalValue(raw);

      if (!isComposing) {
        if (isNumber) {
          const parsed = parseCurrencyInput(raw);
          debouncedUpdate(lang, field.name, parsed);
        } else {
          debouncedUpdate(lang, field.name, raw);
        }
      }
    },
    [isComposing, isNumber, lang, field.name, debouncedUpdate]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (isNumber) {
      const parsed = parseCurrencyInput(value);
      setLocalValue(String(parsed));
    }
  }, [isNumber, value]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (!isComposing && isNumber) {
      const parsed = parseCurrencyInput(localValue);
      setLocalValue(formatCurrencyInput(parsed, currency));
      // Immediate update on blur
      updateTranslation(lang, field.name, parsed);
    }
  }, [
    isComposing,
    isNumber,
    localValue,
    currency,
    lang,
    field.name,
    updateTranslation,
  ]);

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
    if (isNumber) {
      const parsed = parseCurrencyInput(localValue);
      updateTranslation(lang, field.name, parsed);
    } else {
      updateTranslation(lang, field.name, localValue);
    }
  }, [isNumber, localValue, lang, field.name, updateTranslation]);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setLocalValue(val);
      debouncedUpdate(lang, field.name, val);
    },
    [lang, field.name, debouncedUpdate]
  );

  const handleRichTextChange = useCallback(
    (val: { html: string }) => {
      debouncedUpdate(lang, field.name, val.html);
    },
    [lang, field.name, debouncedUpdate]
  );

  const isFullWidth = field.type === 'richtext' || field.name === 'title';
  const colSpan = isFullWidth ? 'md:col-span-2' : '';

  return (
    <div className={`space-y-2 ${colSpan}`}>
      <Label>
        {field.label} ({lang === 'en' ? 'English' : 'Vietnamese'})
      </Label>
      {fieldError?.message && (
        <p className="text-red-500 text-sm">{fieldError.message}</p>
      )}
      {field.type === 'input' || field.type === 'number' ? (
        <Input
          value={localValue}
          type="text"
          placeholder={field.placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          className="w-full rounded-none border bg-gray-200 border-gray-400 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : field.type === 'textarea' ? (
        <Textarea
          placeholder={field.placeholder}
          value={localValue}
          onChange={handleTextareaChange}
          className="w-full rounded-none border bg-gray-200 border-gray-400 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : field.type === 'richtext' ? (
        <RichTextEditor
          initialContent={value}
          onChange={handleRichTextChange}
          className="w-full rounded-none cursor-text"
        />
      ) : null}
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function TranslationFields({
  lang,
  getTranslationValue,
  updateTranslation,
  errors,
  register,
}: Props) {
  const currency = useMemo(
    () => (lang === 'en' ? 'USD' : 'VND') as Currency,
    [lang]
  );
  const translationIndex = useMemo(() => (lang === 'en' ? 0 : 1), [lang]);

  // Memoize updateTranslation để tránh re-render
  const memoizedUpdateTranslation = useCallback(
    (lang: string, field: string, value: string | number) => {
      updateTranslation(lang, field, value);
    },
    [updateTranslation]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {translationFields.map((field) => {
        const value = getTranslationValue(lang, field.name);
        const fieldName = field.name as TranslationFieldName;
        const fieldError = (errors?.translations?.[translationIndex] ?? {})[
          fieldName
        ];

        return (
          <TranslationFieldItem
            key={`${lang}-${field.name}`}
            field={field as TranslationField}
            lang={lang}
            value={value}
            currency={currency}
            updateTranslation={memoizedUpdateTranslation}
            fieldError={fieldError}
          />
        );
      })}
    </div>
  );
}
