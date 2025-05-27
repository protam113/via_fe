'use client';

import { RichTextEditorDemo } from '@/components/tiptap/rich-text-editor';
import React from 'react';

const Pahe = () => {
  return (
    <div className="container">
      <p>page</p>
      <main className="flex-grow container mx-auto px-4 py-8" id="editor">
        <RichTextEditorDemo className="w-full rounded-xl" />
      </main>
    </div>
  );
};

export default Pahe;
