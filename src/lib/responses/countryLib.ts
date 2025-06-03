import { useCountryList } from '@/hooks/country/useCountry';

export const CountryList = (refreshKey: number) => {
  const { data, isLoading, isError } = useCountryList(refreshKey);

  const countries = data ?? [];

  return {
    countries,
    isLoading,
    isError,
  };
};
