// components/button/PushButton.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { PushButtonProps } from '@/types/props.type';
import { ArrowIcons } from '@/assets/icons/icons';
import { Button } from '@/components/ui/button';

const PushButton: React.FC<PushButtonProps> = ({ href, label }) => {
  const router = useRouter();
  const handlePush = () => {
    router.push(href);
  };

  return (
    <Button onClick={handlePush} className="gap-2 rounded-none">
      <span>{label}</span>
      <ArrowIcons.ArrowRight />
    </Button>
  );
};

export default PushButton;
