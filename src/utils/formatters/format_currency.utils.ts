type Currency = 'VND' | 'USD';

interface FormatCurrencyOptions {
  locale?: string; // mặc định 'vi-VN' cho VND, 'en-US' cho USD
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
