type Currency = 'VND' | 'USD';

interface FormatCurrencyOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  amount: number,
  currency: Currency,
  options?: FormatCurrencyOptions
): string {
  const locale = options?.locale ?? (currency === 'VND' ? 'vi-VN' : 'en-US');
  const minimumFractionDigits =
    options?.minimumFractionDigits ?? (currency === 'VND' ? 0 : 2);
  const maximumFractionDigits =
    options?.maximumFractionDigits ?? (currency === 'VND' ? 0 : 2);

  return amount.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });
}

export function formatCurrencyInput(value: number, currency: Currency): string {
  const safe = isNaN(value) ? 0 : value;

  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'vi-VN', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'USD' ? 2 : 0,
    maximumFractionDigits: currency === 'USD' ? 2 : 0,
  }).format(safe);
}

export function parseCurrencyInput(input: string | number): number {
  const str = String(input);
  const cleaned = str.replace(/[^\d.-]/g, '');
  return Number.parseFloat(cleaned) || 0;
}
