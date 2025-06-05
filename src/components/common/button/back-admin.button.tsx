'use client';
// components/button/BackButton.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowIcons } from '@/assets/icons/icons';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center space-x-2 p-2 bg-transparent text-primary-500 rounded-none border border-primary-500 hover:bg-gray-800 hover:text-white transition-all duration-300"
    >
      <ArrowIcons.ArrowLeft className="h-4 w-4" />
      <span className="text-sm">Back</span>
    </button>
  );
};

export default BackButton;
