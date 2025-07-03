export type CountryType = {
  id: number;
  name: string;
  iso2: string;
};

export interface Hero {
  heading?: string;
  backgroundImage?: string;
}

// Richtext

export interface RichTextEditorProps {
  className?: string;
  initialContent?: string;
  onContentChange?: (html: string, text: string) => void;
  onChange?: (content: { html: string; text: string; json: any }) => void;
}

export interface BannerErrorProps {
  locale?: string;
  onRetry: () => void;
  message?: string;
}
