'use client';

import React from 'react';

const Header = ({ title }: { title: string }) => {
  return (
    <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900">
      {title}
    </h2>
  );
};

export default Header;
