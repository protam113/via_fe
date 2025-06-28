'use client';

import '../../assets/styles/tiptap.css';
import { cn } from '@/utils';
import { EditorContent, type Extension, useEditor } from '@tiptap/react';
import { content } from '@/lib/content';

// Extensions
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

// Custom Extensions
import { ImageExtension } from '@/components/tiptap/extensions/image';
import { ImagePlaceholder } from '@/components/tiptap/extensions/image-placeholder';
import SearchAndReplace from '@/components/tiptap/extensions/search-and-replace';
import { TipTapFloatingMenu } from '@/components/tiptap/extensions/floating-menu';
import { FloatingToolbar } from '@/components/tiptap/extensions/floating-toolbar';
import { EditorToolbar } from './toolbars/editor-toolbar';
import { RichTextEditorProps } from '@/types';
import { useEffect } from 'react';

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc',
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: 'is-editor-empty',
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case 'heading':
          return `Heading ${node.attrs.level}`;
        case 'detailsSummary':
          return 'Section title';
        case 'codeBlock':
          // never show the placeholder when editing code
          return '';
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
];

export function RichTextEditor({
  className,
  initialContent,
  onContentChange,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content: initialContent || content,
    editorProps: {
      attributes: {
        class: 'max-w-full focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      const json = editor.getJSON();

      // Gọi callback để truyền data ra component cha
      onContentChange?.(html, text);
      onChange?.({ html, text, json });
    },
  });

  // Method để component cha có thể lấy content bất kỳ lúc nào
  const getContent = () => {
    if (!editor) return { html: '', text: '', json: null };

    return {
      html: editor.getHTML(),
      text: editor.getText(),
      json: editor.getJSON(),
    };
  };

  // Expose getContent method thông qua useImperativeHandle nếu cần
  useEffect(() => {
    if (editor && (window as any).editorRef) {
      (window as any).editorRef.current = { getContent };
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        'relative max-h-[400px] w-full overflow-hidden overflow-y-scroll border bg-card pb-[60px] sm:pb-0',
        className
      )}
    >
      <EditorToolbar editor={editor} />
      <FloatingToolbar editor={editor} />
      <TipTapFloatingMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-[400px] w-full min-w-full cursor-text sm:p-6"
      />
    </div>
  );
}
