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

const SelectCountriesCombo = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    id: number;
    name: string;
    iso2: string;
  } | null>(null);

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

  // Click ngoài để đóng dropdown
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

  const handleSelect = (country: {
    id: number;
    name: string;
    iso2: string;
  }) => {
    setSelectedCountry(country);
    setInputValue(country.name);
    setIsOpen(false);
    console.log('Selected country:', country);
  };

  return (
    <div className="relative w-[280px]" ref={containerRef}>
      <input
        type="text"
        placeholder="Tìm quốc gia hoặc mã ISO2..."
        className="border rounded p-2 w-full"
        value={inputValue}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSelectedCountry(null); // reset chọn khi gõ mới
          setIsOpen(true);
        }}
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
