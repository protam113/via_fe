'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import countries from '@/data/countries.json';

function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

type CountryType = {
  id: number;
  name: string;
  iso2: string;
};

const SelectCountriesCombo = ({
  selectedCountryId,
  onChange,
}: {
  selectedCountryId: number | null;
  onChange: (country: CountryType | null) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedInput = useDebounce(inputValue, 300);

  const filteredCountries = useMemo(() => {
    if (!debouncedInput) return countries.slice(0, 50);
    const lower = debouncedInput.toLowerCase();
    return countries
      .filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.iso2.toLowerCase().includes(lower)
      )
      .slice(0, 50);
  }, [debouncedInput]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync với selectedCountryId từ parent
  useEffect(() => {
    if (selectedCountryId !== null) {
      const country = countries.find((c) => c.id === selectedCountryId);
      if (country) {
        setInputValue(country.name);
      }
    } else {
      setInputValue('');
    }
  }, [selectedCountryId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: CountryType) => {
    setInputValue(country.name);
    setIsOpen(false);

    // Gọi onChange ngay lập tức
    onChange(country);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);

    // Nếu input rỗng, clear selection
    if (value === '') {
      onChange(null);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        placeholder="Select a country"
        className="border rounded p-2 w-full"
        value={inputValue}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow-lg">
          {filteredCountries.length === 0 ? (
            <li className="p-2 text-gray-500">Không tìm thấy quốc gia</li>
          ) : (
            filteredCountries.map((country) => (
              <li
                key={country.id}
                className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white"
                onClick={() => handleSelect(country)}
              >
                {country.name} ({country.iso2})
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectCountriesCombo;
