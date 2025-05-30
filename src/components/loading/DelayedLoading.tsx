'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './loading-screen';

export default function DelayedLoading({
  duration = 2000, // default to 2s
  onComplete,
}: {
  duration?: number;
  onComplete?: () => void;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, onComplete]);

  if (done) return null;

  // 👇 Use the prop directly — not some undefined variable
  return <LoadingScreen onLoadingComplete={onComplete ?? (() => {})} />;
}
